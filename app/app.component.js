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
var facebook_service_1 = require('./facebook.service');
var menu_component_1 = require('./menu.component');
var AppComponent = (function () {
    function AppComponent(fbService) {
        this.fbService = fbService;
        this.title = 'Likers App :)';
        this.status = 'hello';
        this.fb = fbService;
        this.test = "Yasiel Segui";
    }
    AppComponent.prototype.login = function () {
        var _this = this;
        this.fb.login()
            .then(function (response) {
            if (response.status !== 'connected') {
                _this.status = 'Please Refresh Your Browser ...';
                return;
            }
            _this.fbLoginResponse = response;
            _this.status = 'connected';
            console.log(_this.status);
            Promise.resolve('making first request');
        }).then(function (step) {
            console.log(step);
        })
            .catch(function (err) { console.log(err); });
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fb.getLoginStatus()
            .then(function (response) {
            if (response.status === 'connected') {
                _this.status = 'connected';
                console.log(_this.status);
            }
            else {
                _this.status = 'not connected ... real status - ' + response.status;
                console.log(_this.status);
                _this.login();
            }
        })
            .then(function () {
            _this.loadInitialData();
        })
            .then(function () {
            _this.getLikers();
        })
            .then(function () {
            console.log("finish");
        })
            .catch(function (err) { console.log(err); });
    };
    AppComponent.prototype.loadInitialData = function () {
        var scope = this;
        scope.fb.me()
            .then(function (user) {
            scope.user = user;
            console.log(user.picture.url);
        });
    };
    AppComponent.prototype.getLikers = function () {
        var scope = this;
        scope.fb.getLikers(100)
            .then(function (result) {
            console.log(result.length);
        }).catch(function (err) {
            console.log(err);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'likers-app',
            templateUrl: './app/app.component.html',
            providers: [facebook_service_1.FacebookService],
            directives: [menu_component_1.MenuComponent]
        }), 
        __metadata('design:paramtypes', [facebook_service_1.FacebookService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map