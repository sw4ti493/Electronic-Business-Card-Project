var myApp = angular.module('busCard', []);

myApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function(posts){
                        return posts.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }]);

myApp.factory('username', ['$http',function($http){
    var o = {
        username: []
    };
    o.getAll = function() {
        return $http.get('/username').success(function(data){
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post) {
        return $http.post('/username', post).success(function(data){
            o.posts.push(data);
        });
    };

    o.get = function(id) {
        return $http.get('/username/' + id).then(function(res){
            return res.data;
        });
    };

    return o;
}]);

myApp.controller('MainCtrl', function ($scope, $http) {
    $scope.userdata = [];
    $scope.userdata = username.userdata;
    $scope.addUser = function() {
        var theUrl = "https://api.github.com/users/"+$scope.username;
        console.log(theUrl);

        var promise = $http.get(theUrl);
        promise.then(function(response){
        $scope.userdata.push(response.data);
        console.log($scope.userdata);
        })
    };

    $scope.submit = false;
    $scope.edit = true;
    });


