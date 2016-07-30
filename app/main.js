"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
FB.init({
    appId: '1084413394965091',
    cookie: true,
    // the session
    xfbml: true,
    version: 'v2.7' // use graph api version 2.6
});
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent);
//# sourceMappingURL=main.js.map