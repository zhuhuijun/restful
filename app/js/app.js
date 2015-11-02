var app = angular.module('myapp', []);

app.controller('MainCtrl', function ($scope, $http) {
    $scope.showForm = false;
    var options = {
        method: 'GET',
        url: '/user'
    };
    $scope.addShow = function () {
        $scope.showForm = true;
        $scope.action = 'add';
        $scope.user = {};
    };
    $http(options).then(function (res) {
        console.info(res);
        $scope.users = res.data;
    });
    $scope.exec = function (action) {
        switch (action) {
            case 'add':
                var options = {
                    method: 'POST',
                    url: '/user',
                    data: $scope.user,
                    dataType: 'json'
                };
                $http(options).then(function (res) {
                    $scope.users = res.data;
                });
                break;
            case 'edit':
                var options = {
                    method: 'PUT',
                    url: '/user',
                    data: $scope.user,
                    dataType: 'json'
                };
                $http(options).then(function (res) {
                    $scope.users = res.data;
                });
                break;
        }
        $scope.showForm = false;

    };
    $scope.delete = function (id) {
        var options = {
            method: 'DELETE',
            url: '/user?_id=' + id
        };
        $http(options).then(function (res) {
            $scope.users = res.data;
        });
    };
    $scope.editui = function (one) {
        $scope.action = 'edit';
        $scope.showForm = true;
        $scope.user = one;
    };
})