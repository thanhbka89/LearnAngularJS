'use strict';

angular.module('Home')

    .controller('HomeController', ['$scope', '$rootScope',

        function($scope, $rootScope) {
            $scope.cookiesInfo = $rootScope.globals;            
        }
    ]);
