import { Component, OnInit } from '@angular/core';

import { FacebookService } from './facebook.service';

declare const FB: any;

@Component({
  selector: 'likers-app',
  template: `
            <h1>{{title}} => {{status}}</h1>
  `,
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

        FB.login( 
            (result: any) => {
                 this.fbLoginResponse = response;
                 this.status = 'connected';
            }, 
            { scope: 'user_friends' }
        );
        /*
        this.fb.login(response => {
          this.fbLoginResponse = response;
          this.status = 'connected';
        });
        */
    }

    me() {
        FB.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends',
            function(result) {
                if (result && !result.error) {
                    this.user = result;
                    console.log(this.user);
                } else {
                    console.log(result.error);
                }
            });
    }

    ngOnInit() {
       
       var me = this;
        FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                me.status = 'connected';
            } else {
                me.status = 'not connected';
                this.login();
                
            }
            console.log(me.status);
        });
        

        /*
        this.fb.getLoginStatus(response => {
            if (response.status === 'connected') {
                console.log('connected');
            } else {
                this.login();
                console.log('not connected');
            }
        });
        */
        
    }
}