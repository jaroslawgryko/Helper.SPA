import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';
import { PaginatedResult } from '../_models/pagination';
import { Jednostka } from '../_models/Jednostka';
import { JednostkaImport } from '../_models/JednostkaImport';


@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp) { }

  getUsers(page?: number, itemsPerPage?: number, userParams?: any) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let queryString = '?';

    if (page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }

    if (userParams != null) {
      queryString += '&instytucjaRodzaj=' + userParams.instytucjaRodzaj + '&orderBy=' + userParams.orderBy;
    }

    return this.authHttp
      .get(this.baseUrl + 'users' + queryString)
      .map((response: Response) => {
        paginatedResult.result = response.json();

        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      })
      .catch(this.handleError);
  }

  getUser(id): Observable<User> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id)
      .map(response => <User>response.json())
      .catch(this.handleError);
  }

  private jwt() {
      const token = localStorage.getItem('token');
      if (token) {
          const headers = new Headers({'Authorization': 'Bearer ' + token});
          headers.append('Content-type', 'application/json');
          return new RequestOptions({headers: headers});
      }
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }

  updateUser(id: number, user: User) {
    return this.authHttp.put(this.baseUrl +  'users/' + id, user).catch(this.handleError);
  }

  getJednostki(userId: number): Observable<Jednostka[]> {
    return this.authHttp.get(this.baseUrl + 'users/' + userId + '/jednostki' )
    .map(response => <User>response.json())
    .catch(this.handleError);
  }

  importJednostki(userId: number, jednostkiImport: any[]) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/jednostki/import', jednostkiImport)
      .map( (respons: Response) => {
        return respons.json();
      }).catch(this.handleError);
  }
}
