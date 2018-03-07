import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Jednostka } from './../../_models/Jednostka';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jednostka-lista',
  templateUrl: './jednostka-lista.component.html',
  styleUrls: ['./jednostka-lista.component.css']
})
export class JednostkaListaComponent implements OnInit {

  jednostki: Jednostka[];

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadJednostki();
  }

  loadJednostki() {
    this.userService.getJednostki(this.authService.decodedToken.nameid)
      .subscribe(jednostki => {
        this.jednostki = jednostki;
      }, error => {
        this.alertify.error(error);
      });
  }


}
