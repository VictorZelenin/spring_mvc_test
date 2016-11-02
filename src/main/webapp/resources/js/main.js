var app = angular.module('hello', []);

app.controller("AppController", function ($scope, $http) {
    $scope.comments = [];

    $http.get('api/comments').success(function (data) {
        $scope.comments = data;
    });

    $scope.save = function (answer) {
        $http.post('/', answer).success(function (data) {
            $scope.comments.push(data);
            $scope.answer = null;
        });
    };
});

