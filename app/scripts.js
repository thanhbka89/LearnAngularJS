var app=angular.module('spa',['ngRoute']);

app.config(function($routeProvider){
      $routeProvider
          .when('/',{
                templateUrl: 'home.html'
          })
          .when('/about',{
                templateUrl: 'about.html'
          });
});

app.controller('SPAController',function($scope){

    /*      
    Here you can handle controller for specific route as well.
    */
    $scope.message="Hello world";
});

