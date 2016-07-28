
import { Injectable } from '@angular/core';
import { Liker } from './liker';
import { User } from './user';
import { Picture } from './picture';
import { LIKERS } from './mock-likers';

declare const FB: any;
@Injectable()
export class FacebookService {
   isLoggedIn: boolean; 
   user: User;
   posts: any;
   photos: any;
   comments: any;
   totalLikes: number;


   getLikers(top = 100) : Promise<any> {
       var fb = this;
       return new Promise((resolve, reject) => {
           if(!fb.isLoggedIn)
              reject('Error Getting Likers...');

           Promise.all([fb.loadPosts(), fb.loadPhotos(), fb.loadComments()])
                  .then((result) => {
                      [fb.posts, fb.photos, fb.comments] = result;

                      resolve(['1', '12', '123']);
                  }); 
           
           
       });
     
       


   }

   loadPosts() : Promise<any> {
       return Promise.resolve("Whatever");
   }

   loadPhotos() : Promise<any> {
       return Promise.resolve("Whatever");
   }

   loadComments() : Promise<any> {
       return Promise.resolve("Whatever");
   }


   login() : Promise<any> {
        var fb = this;
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
        var fb = this;
        //assuming that FB has been already initialized
        return new Promise((resolve, reject) => {
            FB.getLoginStatus(function (response) {
                if(response){
                    if(response.status === "connected"){
                        fb.isLoggedIn = true;
                    }
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


   getLikerss(){
       return Promise.resolve(LIKERS);
   }

   getLiker(id: string) {
       return this.getLikerss()
                  .then(likers => likers.find(liker => liker.id === id));
   }

}