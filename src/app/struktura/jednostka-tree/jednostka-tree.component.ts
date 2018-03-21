import { Jednostka } from './../../_models/Jednostka';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeModel, NodeEvent, NodeMenuItemAction, MenuItemSelectedEvent, Ng2TreeSettings, TreeComponent } from 'ng2-tree';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-jednostka-tree',
  templateUrl: './jednostka-tree.component.html',
  styleUrls: ['./jednostka-tree.component.css']
})
export class JednostkaTreeComponent implements OnInit {

  jednostki: Jednostka[];

  treeJednostkiSettings = {
    'cssClasses': {
      'expanded': 'fa fa-angle-down',
      'collapsed': 'fa fa-angle-right',
      'leaf': 'fa',
      'empty': 'fa fa-angle-right disabled'
    },
    'templates': {
      'node': '<i class="fa fa-users" aria-hidden="true"></i>',
      'leaf': '<i class="fa fa-file-o" aria-hidden="true"></i>',
      'leftMenu': '<i class="fa fa-navicon"></i>'
    }
  };

  public treeJednostki: TreeModel = {
    settings: this.treeJednostkiSettings,
    value: '',
    children: []
  };

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadJednostki();
  }

  loadJednostki() {
    this.userService.getJednostki(this.authService.decodedToken.nameid)
      .subscribe(jednostki => {
        this.jednostki = jednostki;
        this.buildJednostkiTree();
      }, error => {
        this.alertify.error(error);
      });
  }

  buildJednostkiTree() {

    this.treeJednostki = {
      settings: this.treeJednostkiSettings,
      value: this.jednostki[0].nazwa,
      id: this.jednostki[0].id,
      children: []

    };

    for (let i = 1; i < this.jednostki.length; i++) {
      this.traverse(this.treeJednostki, this.jednostki[i]);
    }

  }

  private traverse(t, u) {

    if (t.id === u.parentId) {
      const newChild: TreeModel = {
        value: u.nazwa,
        id: u.id,
        children: []
      };
      t.children.push(newChild);
    } else {
      for (let i = 0; i < t.children.length; i++) {
        this.traverse(t.children[i], u);
      }
    }
  }

  logEvent(e: NodeEvent): void {
    this.alertify.message(`Wybrałeś: ${e.node.value}`);
  }


}
