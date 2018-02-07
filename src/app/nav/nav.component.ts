import { AuthService } from './../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(data => {
     this.alertify.success('zalogowano');
    }, error => {
     this.alertify.error(error);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('wylogowano');
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
