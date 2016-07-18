
import { Injectable } from '@angular/core';
import { Liker } from './liker';
import { User } from './user';
import { Picture } from './picture';
import { LIKERS } from './mock-likers';

declare const FB: any;
@Injectable()
export class FacebookService {
   user: User;

   login() : Promise<any> {
        //assuming that FB has been already initialized
        return new Promise((resolve, reject) => {
            FB.login(function(result) {
                        if(result){
                            resolve(result);
                        }
                        reject('Error doing login :(');
                     }, 
                     { scope: 'public_profile,user_friends,email,user_about_me,user_posts,user_photos' }
            );
        });
   }

       
   
   getLoginStatus() : Promise<any> {
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

    me() : Promise<User> {
       var fb = this; 
       return new Promise<User>((resolve, reject) => {
            FB.api('/me?fields=id,name,gender,picture.width(150).height(150),age_range,friends',
                function(result) {
                    if (result && !result.error) {
                        console.log('user info received');
                        fb.user = fb.getUserInfo(result);
                        resolve(fb.user);
                    } else {
                        console.log(result.error);
                        reject(null);
                    }
            });
       });
   }

   getUserInfo(result) : User {
       let user = new User();
       user.id = result.id;
       user.gender = result.gender;
       user.likes = 0;
       user.name = result.name;

       let picture = new Picture();
       if(result.picture.data.is_silhouette){
           picture.is_silhouette = true;
       }
       else{
           picture.is_silhouette = false;
           picture.url = result.picture.data.url;
           picture.width = result.picture.data.width;
           picture.height = result.picture.data.height;
       }
       user.picture = picture;
       user.friends_total = result.friends.summary.total_count;
       return user;
   }    


   getLikers(){
       return Promise.resolve(LIKERS);
   }

   getLiker(id: string) {
       return this.getLikers()
                  .then(likers => likers.find(liker => liker.id === id));
   }

}