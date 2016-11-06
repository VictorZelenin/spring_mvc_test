angular.module('controllers', [])
    .controller('commentCtrl', function ($scope, $http) {
        $http.get('api/comments').success(function (data) {
            $scope.comments = data;
            $scope.comments.reverse();
        });

        $scope.saveComment = function (newComment) {
            $http.post('/', newComment).success(function (data) {
                $scope.comments.unshift(data);
                $scope.newComment = '';
            });
        };
    })
    .controller('notificationCtrl', function ($rootScope, $scope, notificationService) {

        console.log(sessionStorage.getItem('user'));
        $scope.authorized = sessionStorage.getItem('user') !== null;

        $scope.saveUser = function (user) {
            $scope.storedUser = notificationService.sendUser(user);
            sessionStorage.setItem('user', $scope.storedUser);
        };

        $scope.getUser = notificationService.receive().then(null, null, function (user) {
            $rootScope.user = user;
            $rootScope.equals = $scope.storedUser.id === $rootScope.user.id;
            console.log('this user:' + $scope.storedUser);
            console.log('received user: ' + $rootScope.user);
            console.log($rootScope.equals);

        });


        $scope.removeFromSession = function (user) {
            sessionStorage.removeItem(user);
            $scope.authorized = false;
        };
    });