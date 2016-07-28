import { Component, OnInit } from '@angular/core';

import { FacebookService } from './facebook.service';
import { User } from './user'
import { MenuComponent } from './menu.component';
declare const FB: any;

@Component({
  selector: 'likers-app',
  templateUrl: './app/app.component.html',
  providers: [ FacebookService ],
  directives: [ MenuComponent ]
})
export class AppComponent implements OnInit {
    title = 'Likers App :)';

    user: User;
    fb: FacebookService;
    fbLoginResponse: any;
    status: string = 'hello';
    test: string;
    

    constructor(private fbService: FacebookService) { 
        this.fb = fbService;
        this.test = "Yasiel Segui";
    }


    login() {
        
        this.fb.login()
               .then(response => {
                   if(response.status !== 'connected'){
                       this.status = 'Please Refresh Your Browser ...';
                       return;
                   }
                   this.fbLoginResponse = response;
                   this.status = 'connected';
                   console.log(this.status);
                   Promise.resolve('making first request');
             }).then(step => {
                 console.log(step);
                 

             })
               .catch(err => { console.log(err); });
        
    }

    ngOnInit() {

        this.fb.getLoginStatus()
               .then( response => {
                    if (response.status === 'connected') {
                        this.status = 'connected';
                        console.log(this.status);

                        //this.loadInitialData();
                    } 
                    else {
                        this.status = 'not connected ... real status - ' + response.status;
                        console.log(this.status);
                        this.login();    
                    }
                    
               })
               .then(() => {
                   this.loadInitialData();
               })
               .then(() => {
                   this.getLikers();
               })
               .then(() => {
                   console.log("finish");
               })
               .catch(err => { console.log(err); });
    }
    
    loadInitialData() {

        var scope = this;
        scope.fb.me()
            .then(user => { 
                scope.user = user;
                console.log(user.picture.url);
                
            });
    }

    getLikers() {
        var scope = this;
        scope.fb.getLikers(100)
               .then(result => {
                   console.log(result.length);
             }).catch(err => {
                 console.log(err);
             });
    }


    
    

}