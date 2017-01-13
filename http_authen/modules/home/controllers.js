'use strict';

angular.module('Home')

    .controller('HomeController', ['$scope', '$rootScope', '$cookies',

        function($scope, $rootScope, $cookies) {
            $scope.cookiesInfo = $rootScope.globals;

            $cookies.NameOfMyCookie = "Setting a value";
            //alert($cookies.get('NameOfMyCookie'));
            var favoriteCookie = $cookies["globals"];
            $scope.cookiesAll = favoriteCookie;
        }
    ]);
