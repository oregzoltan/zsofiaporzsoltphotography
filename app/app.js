'use strict';
var ZsofiaPorzsoltApp = angular.module('ZsofiaPorzsoltApp', ['ngRoute']);

ZsofiaPorzsoltApp.value('lang', {});

ZsofiaPorzsoltApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/galleries', {
      templateUrl: 'views/galleries.html',
      controller: 'galleriesController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'contactController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);
