
import { Injectable } from '@angular/core';
import { Liker } from './liker';
import { LIKERS } from './mock-likers';

declare const FB: any;

@Injectable()
export class FacebookService {


   login(){
       FB.login( 
          (result: any) => {
              return Promise.resolve(result);
          }, 
          { scope: 'user_friends' }
        );
   }
   
    getLoginStatus(){
        FB.getLoginStatus((response: any) => {
            return Promise.resolve(response);
        });
    }
    

    getLikers(){
        return Promise.resolve(LIKERS);
    }

    getLiker(id: string) {
        return this.getLikers()
                    .then(likers => likers.find(liker => liker.id === id));
    }

}