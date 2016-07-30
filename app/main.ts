import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';

declare const FB: any;


    FB.init({
      appId      : '1084413394965091',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.7' // use graph api version 2.6
    });
 

bootstrap(AppComponent);