var app = angular.module('mainApp', []);

app.directive("shape", function() {
    return {
        restrict: "E",
        scope: {
            message: "@"
        },
        controller: function($scope) {
            $scope.shapes = [];

            this.triangle = function() {
                $scope.shapes.push("Triangle");
            };

            this.circle = function() {
                $scope.shapes.push("Circle");
            };
        },
        link: function(scope, element) {
            element.bind("click", function() {
                alert(scope.shapes);
            });
        },
        template: '<button style="color:green">{{message}}</button> <br><br>'
    };

});

app.directive("triangle", function() {
    return {
        require: '^shape',
        link: function(scope, element, attrs, shapeCtrl) {
            shapeCtrl.triangle();
        }
    };
});

app.directive("circle", function() {
    return {
        require: '^shape',
        link: function(scope, element, attrs, shapeCtrl) {
            shapeCtrl.circle();
        }
    };
});
