var app = angular.module('app', []);

app.controller("AppController", function ($scope, $http, NotificationService) {
    $scope.comments = [];
    $scope.isVisible = false;
    $scope.equals = false;

    $http.get('api/comments').success(function (data) {
        $scope.comments = data;
    });

    $scope.save = function (answer) {
        $http.post('/', answer).success(function (data) {
            $scope.comments.push(data);
            $scope.answer = null;
        });
    };

    $scope.addUser = function () {
        $scope.isVisible = true;
        $scope.user = '';

        NotificationService.send($scope.name);
        NotificationService.receive().then(null, null, function (user) {
            $scope.user = user;
            $scope.equals = NotificationService.newId === user.id;
        });
        $scope.name = '';
    };

    $scope.show = function () {
        $scope.isVisible = true;
    };

});

app.service('NotificationService', function ($q, $timeout) {
    var service = {}, listener = $q.defer(), socket = {
        client: null,
        stomp: null
    }, userIds = [];

    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/hello";
    service.USER_TOPIC = "/topic/greetings";
    service.USER_BROKER = "/app/hello";

    service.receive = function () {
        return listener.promise;
    };

    service.send = function (user) {
        var id = Math.floor(Math.random() * 10000);
        service.newId = id;
        socket.stomp.send(service.USER_BROKER, {
            priority: 9
        }, JSON.stringify({
            name: user,
            id: id
        }));
        userIds.push(id);
    };

    var reconnect = function () {
        $timeout(function () {
            initialize();

        }, this.RECONNECT_TIMEOUT);
    };

    var getUser = function (data) {
        var user = JSON.parse(data), out = {};
        out.name = user.name;
        out.id = user.id;

        return out;
    };

    var startListener = function () {
        socket.stomp.subscribe(service.USER_TOPIC, function (data) {
            listener.notify(getUser(data.body));
        });
    };

    var initialize = function () {
        socket.client = new SockJS(service.SOCKET_URL);
        socket.stomp = Stomp.over(socket.client);
        socket.stomp.connect({}, startListener);
        socket.stomp.onclose = reconnect;
    };

    initialize();

    return service;
});

