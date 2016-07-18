
import { Injectable } from '@angular/core';
import { Liker } from './liker';
import { LIKERS } from './mock-likers';

declare const FB: any;
@Injectable()
export class FacebookService {


   login() : Promise<any> {

        return new Promise((resolve, reject) => {
            FB.login(function(result) {
                        if(result){
                            resolve(result);
                        }
                        reject('Error doing login :(');
                     }, 
                     { scope: 'user_friends' }
            );
        });
   }

       
   
   getLoginStatus() : Promise<any>{
        
        //assuming that FB has been already initialized
        return new Promise((resolve, reject) => {
            FB.getLoginStatus(function (response) {
                if(response){
                    resolve(response);
                }
                reject('Error getting Login Status :(');
            });
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