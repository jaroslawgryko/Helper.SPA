import { Jednostka } from './../_models/Jednostka';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import 'rxjs/add/operator/catch';

@Injectable()
export class JednostkiResolver implements Resolve<Jednostka[]> {

    constructor(private userService: UserService, private authService: AuthService,
        private alertify: AlertifyService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Jednostka[]> {
        return this.userService.getJednostki(this.authService.decodedToken.nameid)
            .catch(error => {
                this.alertify.error('Problem z pobraniem jednostek');
                this.router.navigate(['members']);
                return Observable.of(null);
            });
    }

}
