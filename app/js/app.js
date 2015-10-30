var app = angular.module('myapp', []);
app.controller('MainCtrl', function ($scope) {
    $scope.users = [
        {username: 'zhj', userpwd: '123', useremail: '123@qq.com'},
        {username: 'zhj', userpwd: '123', useremail: '123@qq.com'}
    ];
})