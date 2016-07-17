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
var AppComponent = (function () {
    function AppComponent(fbService) {
        this.fbService = fbService;
        this.title = 'Likers App :)';
        this.status = 'hello';
        this.fb = fbService;
    }
    AppComponent.prototype.login = function () {
        var _this = this;
        FB.login(function (result) {
            _this.fbLoginResponse = response;
            _this.status = 'connected';
        }, { scope: 'user_friends' });
        /*
        this.fb.login(response => {
          this.fbLoginResponse = response;
          this.status = 'connected';
        });
        */
    };
    AppComponent.prototype.me = function () {
        FB.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends', function (result) {
            if (result && !result.error) {
                this.user = result;
                console.log(this.user);
            }
            else {
                console.log(result.error);
            }
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var me = this;
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                me.status = 'connected';
            }
            else {
                me.status = 'not connected';
                _this.login();
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
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'likers-app',
            template: "\n            <h1>{{title}} => {{status}}</h1>\n  ",
            providers: [facebook_service_1.FacebookService]
        }), 
        __metadata('design:paramtypes', [facebook_service_1.FacebookService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map