
(function (jq) {
	'use strict';
	
	angular.
			module('example' , [
				'ngCookies', 
				'ngResource', 
				'ui.router',
				'share.networkServices',
				'example.home',
				'example.student']); // define a new application module 
} (jQuery));