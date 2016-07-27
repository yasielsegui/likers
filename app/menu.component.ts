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

}