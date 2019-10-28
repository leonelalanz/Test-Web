var app = angular.module("appSinergy", ["ngRoute", "ngAnimate", "ngResource","ui.bootstrap"]);

app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl: "templates/login.html",
        controller: "userController"
    })
    .when("/timeline",{
        templateUrl: "templates/timeline.html",
        controller: "timelineController"
    }).otherwise({
        redirectTo: '/'
    });
});

