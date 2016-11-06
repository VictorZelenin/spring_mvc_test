angular.module('services', [])
    .service('notificationService', function ($q) {
        var service = {}, listener = $q.defer(), socket = {
            client: null,
            stomp: null
        };

        service.users = [];
        service.SOCKET_URL = "/hello";
        service.USER_TOPIC = "/topic/greetings";
        service.USER_BROKER = "/app/hello";

        service.receive = function () {
            return listener.promise;
        };

        service.sendUser = function (user) {
            var newUser = {
                id: Math.floor(Math.random() * 10000),
                name: user
            };
            socket.stomp.send(service.USER_BROKER, {
                priority: 9
            }, JSON.stringify(newUser));
            service.users.push(newUser);

            return newUser;
        };

        var getUser = function (data) {
            return JSON.parse(data);
        };

        var startListener = function () {
            socket.stomp.subscribe(service.USER_TOPIC, function (data) {
                listener.notify(getUser(data.body));
            });
        };

        var init = function () {
            socket.client = new SockJS(service.SOCKET_URL);
            socket.stomp = Stomp.over(socket.client);
            socket.stomp.connect({}, startListener);
        };

        init();

        return service;
    })

    .service('userService', function () {

    });