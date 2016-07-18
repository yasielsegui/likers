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
var mock_likers_1 = require('./mock-likers');
var FacebookService = (function () {
    function FacebookService() {
    }
    FacebookService.prototype.login = function () {
        return new Promise(function (resolve, reject) {
            FB.login(function (result) {
                if (result) {
                    resolve(result);
                }
                reject('Error doing login :(');
            }, { scope: 'user_friends' });
        });
    };
    FacebookService.prototype.getLoginStatus = function () {
        //assuming that FB has been already initialized
        return new Promise(function (resolve, reject) {
            FB.getLoginStatus(function (response) {
                if (response) {
                    resolve(response);
                }
                reject('Error getting Login Status :(');
            });
        });
    };
    FacebookService.prototype.getLikers = function () {
        return Promise.resolve(mock_likers_1.LIKERS);
    };
    FacebookService.prototype.getLiker = function (id) {
        return this.getLikers()
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