angular.module('app', ['controllers', 'services', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/login',
                controller: 'notificationCtrl'
            })
            .when('/comment', {
                templateUrl: '/comment',
                controller: 'commentCtrl'
            });
    });