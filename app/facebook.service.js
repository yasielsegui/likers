"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var user_1 = require('./user');
var picture_1 = require('./picture');
var mock_likers_1 = require('./mock-likers');
var FacebookService = (function () {
    function FacebookService() {
    }
    FacebookService.prototype.getLikers = function (top) {
        if (top === void 0) { top = 100; }
        var fb = this;
        return new Promise(function (resolve, reject) {
            if (!fb.isLoggedIn)
                reject('Error Getting Likers...');
            Promise.all([fb.loadPosts(), fb.loadPhotos()])
                .then(function (result) {
                var postsResp = result[0], photosResp = result[1];
                fb.likers = {};
                if (postsResp && postsResp.posts) {
                    fb.user.total_posts = fb.getLikersFromPosts(postsResp, fb.likers);
                }
                if (photosResp && photosResp.photos) {
                    fb.user.total_photos = fb.getLikersFromPhotos(photosResp, fb.likers);
                }
                var sortable = [];
                for (var liker in fb.likers) {
                    sortable.push(fb.likers[liker]);
                }
                sortable.sort(fb.sortLikersCriteria);
                fb.user.friends = sortable.slice(0, fb.user.total_friends);
                /*ONLY FOR DEBUGGING PURPOSE*/
                fb.logLikers(sortable, 100, fb.user.total_likes);
                resolve(['loaded', 'posts', 'and photos']);
            });
        });
    };
    FacebookService.prototype.logLikers = function (likers, top, total_likes) {
        if (top === void 0) { top = 100; }
        console.log("Total Likes: " + total_likes);
        for (var i = 0; i < Math.min(likers.length, top); i++) {
            console.log((i + 1) + " - " + likers[i].name + " ----- " + likers[i].count + '\n');
        }
    };
    FacebookService.prototype.sortLikersCriteria = function (a, b) {
        return b.count - a.count;
    };
    FacebookService.prototype.getLikersFromPosts = function (response, likers) {
        if (!response.posts || response.posts.data.length <= 0)
            return 0;
        var total_posts = 0;
        for (var i = 0; i < response.posts.data.length; i++) {
            total_posts += 1;
            //counting the likes inside your comments
            var post = response.posts.data[i];
            if (post.comments && post.comments.data.length > 0) {
                for (var j = 0; j < post.comments.data.length; j++) {
                    var comment = post.comments.data[j];
                    if (comment.from.id === this.user.id) {
                        if (!comment.likes || comment.likes.data.length <= 0)
                            continue;
                        for (var k = 0; k < comment.likes.data.length; k++) {
                            var like = comment.likes.data[k];
                            if (likers[like.name]) {
                                likers[like.name].count++;
                            }
                            else {
                                likers[like.name] = {
                                    id: like.id,
                                    name: like.name,
                                    count: 1,
                                    picture: (like.picture.data.is_silhouette) ? null : like.picture.data.url
                                };
                            }
                            this.user.total_likes += 1;
                        }
                    }
                }
            }
            //counting the likes in the actual post
            if (post.likes && post.likes.data.length > 0) {
                for (var j = 0; j < post.likes.data.length; j++) {
                    var like = post.likes.data[j];
                    if (likers[like.name]) {
                        likers[like.name].count++;
                    }
                    else {
                        likers[like.name] = {
                            id: like.id,
                            name: like.name,
                            count: 1,
                            picture: (like.picture.data.is_silhouette) ? null : like.picture.data.url
                        };
                    }
                    this.user.total_likes += 1;
                }
            }
        }
        return total_posts;
    };
    FacebookService.prototype.getLikersFromPhotos = function (response, likers) {
        if (!response.photos || response.photos.data.length <= 0)
            return 0;
        var total_photos = 0;
        for (var i = 0; i < response.photos.data.length; i++) {
            total_photos += 1;
            //counting the likes inside your comments
            var photo = response.photos.data[i];
            if (photo.comments && photo.comments.data.length > 0) {
                for (var j = 0; j < photo.comments.data.length; j++) {
                    var comment = photo.comments.data[j];
                    if (comment.from.id === this.user.id) {
                        if (!comment.likes || comment.likes.data.length <= 0)
                            continue;
                        for (var k = 0; k < comment.likes.data.length; k++) {
                            var like = comment.likes.data[k];
                            if (likers[like.name]) {
                                likers[like.name].count++;
                            }
                            else {
                                likers[like.name] = {
                                    id: like.id,
                                    name: like.name,
                                    count: 1,
                                    picture: (like.picture.data.is_silhouette) ? null : like.picture.data.url
                                };
                            }
                            this.user.total_likes += 1;
                        }
                    }
                }
            }
            //counting the likes in the actual photo
            if (photo.likes && photo.likes.data.length > 0) {
                for (var j = 0; j < photo.likes.data.length; j++) {
                    var like = photo.likes.data[j];
                    if (likers[like.name]) {
                        likers[like.name].count++;
                    }
                    else {
                        likers[like.name] = {
                            id: like.id,
                            name: like.name,
                            count: 1,
                            picture: (like.picture.data.is_silhouette) ? null : like.picture.data.url
                        };
                    }
                    this.user.total_likes += 1;
                }
            }
        }
        return total_photos;
    };
    FacebookService.prototype.loadPosts = function () {
        var fb = this;
        return new Promise(function (resolve, reject) {
            FB.api('/me', 'get', { fields: 'posts.limit(1000){id,picture,comments.limit(1000){id,from,likes.limit(1000){id,name,picture}},likes.limit(1000){id,name,picture}}' }, function (response) {
                if (response) {
                    console.log('loaded posts');
                    resolve(response);
                }
                else {
                    reject("Error Loading Posts...");
                }
            });
        });
    };
    FacebookService.prototype.loadPhotos = function () {
        var fb = this;
        return new Promise(function (resolve, reject) {
            FB.api('/me', 'get', { fields: 'photos.limit(1000){id,name,comments.limit(1000){id,from,likes.limit(1000){id,name,picture}},likes.limit(1000){id,name,picture}}' }, function (response) {
                if (response) {
                    console.log('loaded photos');
                    resolve(response);
                }
                else {
                    reject("Error Loading Photos...");
                }
            });
        });
    };
    FacebookService.prototype.loadComments = function () {
        return Promise.resolve("Whatever");
    };
    FacebookService.prototype.login = function () {
        var fb = this;
        //assuming that FB has been already initialized
        return new Promise(function (resolve, reject) {
            FB.login(function (result) {
                if (result) {
                    resolve(result);
                }
                reject('Error doing login :(');
            }, { scope: 'public_profile,user_friends,email,user_about_me,user_posts,user_photos' });
        });
    };
    FacebookService.prototype.getLoginStatus = function () {
        var fb = this;
        //assuming that FB has been already initialized
        return new Promise(function (resolve, reject) {
            FB.getLoginStatus(function (response) {
                if (response) {
                    if (response.status === "connected") {
                        fb.isLoggedIn = true;
                    }
                    resolve(response);
                }
                reject('Error getting Login Status :(');
            });
        });
    };
    FacebookService.prototype.me = function () {
        var fb = this;
        return new Promise(function (resolve, reject) {
            FB.api('/me?fields=id,name,gender,picture.width(150).height(150),age_range,friends.limit(1),posts.limit(1),photos.limit(1)', function (result) {
                if (result && !result.error) {
                    console.log('user info received');
                    fb.user = fb.getUserInfo(result);
                    resolve(fb.user);
                }
                else {
                    console.log(result.error);
                    reject(null);
                }
            });
        });
    };
    FacebookService.prototype.getUserInfo = function (result) {
        var user = new user_1.User();
        user.id = result.id;
        user.gender = result.gender;
        user.total_likes = 0;
        user.name = result.name;
        user.posts = {};
        user.comments = {};
        user.photos = {};
        user.friends = {};
        var picture = new picture_1.Picture();
        if (result.picture.data.is_silhouette) {
            picture.is_silhouette = true;
        }
        else {
            picture.is_silhouette = false;
            picture.url = result.picture.data.url;
            picture.width = result.picture.data.width;
            picture.height = result.picture.data.height;
        }
        user.picture = picture;
        user.total_friends = 0;
        if (result.friends && result.friends.summary) {
            user.total_friends = result.friends.summary.total_count;
        }
        return user;
    };
    FacebookService.prototype.getLikerss = function () {
        return Promise.resolve(mock_likers_1.LIKERS);
    };
    FacebookService.prototype.getLiker = function (id) {
        return this.getLikerss()
            .then(function (likers) { return likers.find(function (liker) { return liker.id === id; }); });
    };
    FacebookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FacebookService);
    return FacebookService;
}());
exports.FacebookService = FacebookService;
//# sourceMappingURL=facebook.service.js.map