import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  pagination: Pagination;

  // user: User = JSON.parse(localStorage.getItem('user'));
  rodzajeInstytucji = [
      {value: 'urząd wojewódzki', display: 'Urzędy wojewódzkie'},
      {value: 'ministerstwo', display: 'Ministerstwa'},
      {value: 'archiwum państwowe', display: 'Archiwa państwowe'},
      {value: 'uczelnia wyższa', display: 'Uczelnie wyższe'},
      {value: 'urzęd centralny', display: 'Urzędy centralne'},
      {value: 'samorząd', display: 'Samorząd'},
      {value: 'sąd', display: 'Sądy'},
      {value: 'pozostali', display: 'Pozostałe'},
      {value: 'all', display: 'Wszystkie'}
  ];

  userParams: any = {};

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.orderBy = 'ostatniaAktywnosc';
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.instytucjaRodzaj = 'all';
    this.loadUsers();
  }
}
