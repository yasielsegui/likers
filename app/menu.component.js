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
var user_1 = require('./user');
var MenuComponent = (function () {
    function MenuComponent() {
    }
    //UI Methods
    MenuComponent.prototype.toggleMenu = function () {
        var body = document.querySelector("body");
        if (this.hasClass(body, 'nav-md')) {
            this.showMenuItems = false;
            this.itemsClass = 'active-sm';
        }
        else {
            this.showMenuItems = true;
            this.itemsClass = 'active';
        }
        'nav-md nav-sm'.split(' ').forEach(function (s) {
            body.classList.toggle(s);
        });
    };
    MenuComponent.prototype.hasClass = function (element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], MenuComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenuComponent.prototype, "test", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'app-menu',
            templateUrl: './app/menu.component.html',
            providers: [facebook_service_1.FacebookService],
            directives: [MenuComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map