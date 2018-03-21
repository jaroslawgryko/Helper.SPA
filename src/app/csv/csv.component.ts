import { JednostkaImport } from './../_models/JednostkaImport';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Jednostka } from '../_models/Jednostka';

import * as Papa from 'papaparse';

@Component({
  selector: 'app-csv',
  styleUrls: ['./csv.component.css'],
  templateUrl: './csv.component.html'
})
export class CsvComponent implements OnInit {

  jednostki: Jednostka[];
  jednostkiForImport;

  dataSubscription: Subscription;
  csvHeaders: string[];
  csvData: any;
  csvErrors: any[] = [];
  csvErrs: number;

  csvDataType = 'jednostki';

  rwaMap = { symbol: '', nazwa: '', kArchiwumMacierzyste: '',  kArchiwumInne: '', kArchiwumInneOpis: '', typProwadzenia: ''};
  jednostkaMap = { symbol: '', nazwa: '', opis: '', nadrzedny: ''};
  pracownikMap = { imie: '', nazwisko: '', stanowisko: '', inicjaly: '', email: '', login: '', loginAD: '', symbol: ''};

  constructor(private authService: AuthService, private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadJednostki();
    this.csvErrs = -1;
  }

  loadJednostki() {
    this.userService.getJednostki(this.authService.decodedToken.nameid)
      .subscribe(jednostki => {
        this.jednostki = jednostki;
      }, error => {
        this.alertify.error(error);
      });
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.parseCsv(file);
  }

  parseCsv(file: File) {
    if (file !== null) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: results => {
          this.csvData = results.data;
          this.csvHeaders = results.meta.fields;
          this.resetCsvErrors();
          this.csvErrs = -1;
        }
      });
    }
  }

  resetCsvErrors() {
    this.csvErrs = -1;
    this.csvErrors = [];
    for (let i = 0; i < this.csvData.length; i++) {
      this.csvErrors[i] = ['not checked'];
    }
  }

  checkRwa() {
    const errors = [];
    const symbols: string[] = [];
    const parents: string[] = [];
    this.csvErrs = 0;

    for (let i = 0; i < this.csvData.length; i++) {
      const s = (this.csvData[i][this.rwaMap['symbol']]).toString();
      const sP = s.slice(0, s.length - 1);
      symbols.push(s);
      parents.push(sP);
    }

    for (let i = 0; i < this.csvData.length; i++ ) {

      const s = (this.csvData[i][this.rwaMap['symbol']]).toString();
      const sP = s.slice(0, s.length - 1);

      const errTab: any[] = new Array;

      // liczba pól
      const size = Object.keys(this.csvData[i]).length;
      if (size < this.csvHeaders.length ) {
        errTab.push('za mało pól');
      }
      if (size > this.csvHeaders.length ) {
        errTab.push('za dużo pól');
      }

      // istnienie symbolu
      if (  typeof s === 'undefined' || s == null || s === '' )  {
        errTab.push('brak symbolu');
      }

      // unikalność symboli
      if (symbols.indexOf(s) !== symbols.lastIndexOf(s)) {
        errTab.push('symbol powtórzony');
      }

      // czy ma parenta
      if (s.length > 1) {
        if (symbols.indexOf(sP) === -1) {
          errTab.push('brak rodzica');
        }
      }

      if ( errTab.length > 0) {
        this.csvErrs++;
        errors[i] = 'err: ' + errTab;
      } else {
        errors[i] = '';
      }
    }

    this.csvErrors = errors;
  }

  checkJednostki() {
    const errors = [];
    const symbols: string[] = [];
    const parents: string[] = [];
    this.csvErrs = 0;
    this.jednostkiForImport = [];

    for (let i = 0; i < this.jednostki.length; i++) {
      symbols.push(this.jednostki[i].symbol);
      parents.push(this.jednostki[i].symbol);
    }

    for (let i = 0; i < this.csvData.length; i++) {
      symbols.push(this.csvData[i][this.jednostkaMap['symbol']]);
      parents.push(this.csvData[i][this.jednostkaMap['nadrzedny']]);
    }

    for (let i = 0; i < this.csvData.length; i++) {

      const errTab: any[] = new Array;

      const s = this.csvData[i][this.jednostkaMap['symbol']];
      const p = this.csvData[i][this.jednostkaMap['nadrzedny']];

      // liczba pól
      const size = Object.keys(this.csvData[i]).length;
      if (size < this.csvHeaders.length ) {
        errTab.push('za mało pól');
      }
      if (size > this.csvHeaders.length ) {
        errTab.push('za dużo pól');
      }

      if (i === 0 && p === '') {
        errTab.push('powtórzona jednostka główna');
      }

      // istnienie symbolu
      if ( typeof s === 'undefined' || s == null || s === '' ) {
        errTab.push('brak symbolu');
      }

      // unikalność symboli
      if (symbols.indexOf(s) !== symbols.lastIndexOf(s)) {
        errTab.push('symbol powtórzony');
      }

      // czy każdy ma rodzica
      const up1 = symbols.indexOf(parents[i]);
      if (up1 === -1) {
        errTab.push('brak rodzica');
      }

      // kolejność
      if (i !== 0 && (i <= (symbols.indexOf(p) - this.jednostki.length) )) {
        errTab.push('przesuń niżej niż ' + (2 + symbols.indexOf(p) - this.jednostki.length));
      }

      // this.errors.push(errTab);
      if ( errTab.length > 0) {
        this.csvErrs++;
        errors[i] = 'err: ' + errTab;
      } else {
        errors[i] = '';
      }
    }

    this.csvErrors = errors;
    this.jednostkiForImport = [];

    if (this.csvErrs === 0) {
      for (let i = 0; i < this.csvData.length; i++) {
        this.jednostkiForImport.push(
          {
            nazwa: this.csvData[i][this.jednostkaMap['nazwa']],
            symbol: this.csvData[i][this.jednostkaMap['symbol']],
            opis: this.csvData[i][this.jednostkaMap['opis']],
            nadrzedny: this.csvData[i][this.jednostkaMap['nadrzedny']]
          }
        );
      }

    }

  }

  checkPracownicy() {
    const errors = [];
    const symbols: string[] = [];
    this.csvErrs = 0;


    for (let i = 0; i < this.jednostki.length; i++) {
      const j = this.jednostki[i];
      symbols.push(j.symbol);
    }

    for (let i = 0; i < this.csvData.length; i++ ) {

      const errTab: any[] = new Array;
      const s = (this.csvData[i][this.pracownikMap['symbol']]).toString();

      // istnienie symbolu
      if (  typeof s === 'undefined' || s == null || s === '' ) {
        errTab.push('brak symbolu');
      }

      // istnieje symbolu w jednostkach
      if (symbols.indexOf(s) === -1 ) {
        errTab.push('brak jednostki');
      }

      if ( errTab.length > 0) {
        this.csvErrs++;
        errors[i] = 'err: ' + errTab;
      } else {
        errors[i] = '';
      }
    }

    this.csvErrors = errors;
  }

  importJednostek() {

    if (this.jednostkiForImport.length > 0) {
      this.userService.importJednostki(this.authService.decodedToken.nameid, this.jednostkiForImport)
        .subscribe(() => {
          this.loadJednostki();
          this.alertify.success('Jednostki zostały dodane');
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.alertify.message('Brak jednostek do zaimportowania');
    }
  }

}
