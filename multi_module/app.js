var rootApp = angular.module('rootApp', ['firstApp', 'secondApp', 'app']);

// Define all your modules with no dependencies
var firstApp = angular.module('firstApp', []);
firstApp.controller('FirstController', function($scope) {
    $scope.desc = "First app. ";
});

var secondApp = angular.module('secondApp', []);
secondApp.controller('SecondController', function($scope) {
    $scope.desc = "Second app. ";
});


// setter syntax -> initializing other module for demonstration
angular.module('otherModule', []);

angular.module('app', ['otherModule'])
    .controller('AppController', function($scope) {
        this.name = 'thanh nguyen';
        $scope.name = 'thanhbka';
    });

// getter syntax
angular.module('otherModule')
    .controller('OtherController', function($scope) {
        $scope.name = 'thanhnm';
    });
