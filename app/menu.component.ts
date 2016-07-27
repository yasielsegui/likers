import { Component, OnInit, Input } from '@angular/core';

import { FacebookService } from './facebook.service';
import { User } from './user'


declare const FB: any;

@Component({
  selector: 'app-menu',
  templateUrl: './app/menu.component.html',
  providers: [ FacebookService ],
  directives: [ MenuComponent ]
})
export class MenuComponent {
    @Input()
    user: User;

    @Input()
    test: string;

    showMenuItems: boolean;
    itemsClass: string;



    //UI Methods
    toggleMenu() {
      var body = document.querySelector("body");
      if(this.hasClass(body, 'nav-md')){

        this.showMenuItems = false;
        this.itemsClass = 'active-sm';
      }
      else{
        this.showMenuItems = true;
        this.itemsClass = 'active';
      }
      'nav-md nav-sm'.split(' ').forEach(function(s) { 
          body.classList.toggle(s); 
      });
    }

    hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }


}