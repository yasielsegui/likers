import { Component, OnInit } from '@angular/core';

import { FacebookService } from './facebook.service';
import { User } from './user'

declare const FB: any;

@Component({
  selector: 'likers-app',
  templateUrl: './app/app.component.html',
  providers: [ FacebookService ]
})
export class AppComponent implements OnInit {
    title = 'Likers App :)';

    fb: FacebookService;
    fbLoginResponse: any;
    status: string = 'hello';
    

    constructor(private fbService: FacebookService) { 
        this.fb = fbService;
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

                        this.loadInitialData();
                    } 
                    else {
                        this.status = 'not connected ... real status - ' + response.status;
                        console.log(this.status);
                        this.login();    
                    }
               })
               .catch(err => { console.log(err); });
    }
    
    loadInitialData()
    {
        this.fb.me()
               .then(user => { 
                   console.log(user.id);
             }).catch(err => {
                   console.log(err);
             });
    }

}