angular.module('myApp.person', [])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('person', {
                url: '/person',
                views: {
                    'jokesContent': {
                        templateUrl: "app/view_person/person.html",
                        controller: 'PersonCtrl as person'
                    }
                }
            })
    }])

    .controller('PersonCtrl', ['$rootScope', function($rootScope) {}])
