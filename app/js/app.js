var app = angular.module('myapp', []);
app.controller('MainCtrl', function ($scope, $http) {
    $scope.users = [
        {username: 'zhj', userpwd: '123', useremail: '123@qq.com'},
        {username: 'zhj', userpwd: '123', useremail: '123@qq.com'}
    ];
    $scope.addUser = function () {
        var options = {
            method: 'POST',
            url: '/user',
            data: $scope.user,
            dataType: 'json'
        };
        $http(options).then(function (res) {
            $scope.users = res.data;
        });
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
})