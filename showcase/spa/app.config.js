(function() {
    'use strict';

    angular
        .module('routerApp')
        .config(appRouterConfig);

    function appRouterConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home'); //Mọi đường dẫn không hợp lệ đều được chuyển đến state home

        $stateProvider

            .state('product', { // Định ngĩa 1 state home
                url: '/product', // khai báo Url hiển thị
                templateUrl: 'product/product.view.html', //đường dẫn view
                controller: 'PrtController', //// Khai báo 1 controller cho state home || controller: 'PrtController as pc'
                controllerAs: 'pc',
            })

            .state('home', {
                url: '/home',
                templateUrl: 'home/home.view.html'
            })

            .state('about', {
                url: '/about',
                templateUrl: 'about/about.view.html'
            })

    }
})();
