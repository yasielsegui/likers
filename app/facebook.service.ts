
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
   likers: any;
   comments: any;
   totalLikes: number;


   getLikers(top = 100) : Promise<any> {
       var fb = this;
       return new Promise((resolve, reject) => {
           if(!fb.isLoggedIn)
              reject('Error Getting Likers...');

           Promise.all([fb.loadPosts(), fb.loadPhotos()])
                  .then((result) => {
                      
                      let [postsResp, photosResp] = result;
                      fb.likers = { };
                      if(postsResp && postsResp.posts) {
                         fb.user.total_posts = fb.getLikersFromPosts(postsResp, fb.likers);
                      }

                       if(photosResp && photosResp.photos) {
                         fb.user.total_photos = fb.getLikersFromPhotos(photosResp, fb.likers);
                      }

                      var sortable = [];
                      for (var liker in fb.likers){
                              sortable.push(fb.likers[liker]);
                      }
                      sortable.sort(fb.sortLikersCriteria);

                      fb.user.friends = sortable.slice(0, fb.user.total_friends);

                      /*ONLY FOR DEBUGGING PURPOSE*/
                      fb.logLikers(sortable, 100, fb.user.total_likes);
                      
                      resolve(['loaded', 'posts', 'and photos']);
                  }); 
           
           
       });
     
       
   }

   logLikers(likers, top=100, total_likes){
       console.log("Total Likes: " + total_likes);
       for(var i=0; i<Math.min(likers.length, top); i++){
           console.log((i+1) + " - " + likers[i].name + " ----- " + likers[i].count + '\n');
       }
   }

   sortLikersCriteria(a, b){
       return b.count - a.count;
   }

   getLikersFromPosts(response, likers) : number {
      if(!response.posts || response.posts.data.length <= 0)
         return 0;

      var total_posts = 0;
      for(var i=0; i<response.posts.data.length; i++)
      {
         total_posts += 1; 
         //counting the likes inside your comments
         var post = response.posts.data[i];
         if(post.comments && post.comments.data.length > 0)
         {
            for(var j=0; j<post.comments.data.length; j++)
            {
                var comment = post.comments.data[j];
                if(comment.from.id === this.user.id)/*TODO: Change for the id*/
                {
                    if(!comment.likes || comment.likes.data.length <= 0)
                        continue;
            
                    for(var k=0; k<comment.likes.data.length; k++)
                    {
                        var like = comment.likes.data[k]
                        if(likers[like.name])
                        {
                            likers[like.name].count++;
                        }
                        else
                        {
                            likers[like.name] = {
                                                    id: like.id,
                                                    name: like.name,
                                                    count: 1,
                                                    picture: (like.picture.data.is_silhouette) ? null : like.picture.data.url
                                                };
                        }
                        this.user.total_likes +=1;
                    }
                }
            }
         }
           
         
         //counting the likes in the actual post
         if(post.likes && post.likes.data.length > 0)
         {
             for(var j=0; j<post.likes.data.length; j++)
             {
                 var like = post.likes.data[j]
                 if(likers[like.name])
                 {
                     likers[like.name].count++;
                 }
                 else
                 {
                     likers[like.name] = {
                                             id: like.id,
                                             name: like.name,
                                             count: 1,
                                             picture: (like.picture.data.is_silhouette) ? null : like.picture.data.url
                                         };
                 }
                 this.user.total_likes +=1;
             }
         }
      }

      return total_posts;
   }

   getLikersFromPhotos(response, likers) {
      if(!response.photos || response.photos.data.length <= 0)
         return 0;
      
      var total_photos = 0;
      for(var i=0; i<response.photos.data.length; i++)
      {
         total_photos += 1; 
         //counting the likes inside your comments
         var photo = response.photos.data[i];
         if(photo.comments && photo.comments.data.length > 0)
         {
            for(var j=0; j<photo.comments.data.length; j++)
            {
                var comment = photo.comments.data[j];
                if(comment.from.id === this.user.id)/*TODO: Change for the id*/
                {
                    if(!comment.likes || comment.likes.data.length <= 0)
                        continue;
            
                    for(var k=0; k<comment.likes.data.length; k++)
                    {
                        var like = comment.likes.data[k]
                        if(likers[like.name])
                        {
                            likers[like.name].count++;
                        }
                        else
                        {
                            likers[like.name] = {
                                                    id: like.id,
                                                    name: like.name,
                                                    count: 1,
                                                    picture: (like.picture.data.is_silhouette) ? null : like.picture.data.url
                                                };
                        }
                        this.user.total_likes +=1;
                    }
                }
            }
         }
           
         
         //counting the likes in the actual photo
         if(photo.likes && photo.likes.data.length > 0)
         {
             for(var j=0; j<photo.likes.data.length; j++)
             {
                 var like = photo.likes.data[j]
                 if(likers[like.name])
                 {
                     likers[like.name].count++;
                 }
                 else
                 {
                     likers[like.name] = {
                                             id: like.id,
                                             name: like.name,
                                             count: 1,
                                             picture: (like.picture.data.is_silhouette) ? null : like.picture.data.url
                                         };
                 }
                 this.user.total_likes +=1;
             }
         }
      }

      return total_photos;
   }

   loadPosts() : Promise<any> {
       var fb = this;
       return new Promise((resolve, reject) => {
           FB.api('/me', 'get', 
                { fields: 'posts.limit(1000){id,picture,comments.limit(1000){id,from,likes.limit(1000){id,name,picture}},likes.limit(1000){id,name,picture}}'},
                function(response) {
                    if (response) {
                      console.log('loaded posts');
                      resolve(response);  
                    } else {
                        reject("Error Loading Posts...");
                    }
            });
       });
   }

   loadPhotos() : Promise<any> {
       var fb = this;
       return new Promise((resolve, reject) => {
           FB.api('/me', 'get', 
                { fields: 'photos.limit(1000){id,name,comments.limit(1000){id,from,likes.limit(1000){id,name,picture}},likes.limit(1000){id,name,picture}}'},
                function(response) {
                    if (response) {
                      console.log('loaded photos');  
                      resolve(response);
                    } else {
                        reject("Error Loading Photos...");
                    }
            });
       });
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
            FB.api('/me?fields=id,name,gender,picture.width(150).height(150),age_range,friends.limit(1),posts.limit(1),photos.limit(1)',
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
       user.total_likes = 0;
       user.name = result.name;

       user.posts = {};
       user.comments = {};
       user.photos = {};
       user.friends = {};


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
       user.total_friends = 0;
       if(result.friends && result.friends.summary){
           user.total_friends = result.friends.summary.total_count;
       }
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