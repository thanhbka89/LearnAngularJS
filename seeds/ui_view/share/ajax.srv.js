(function(jq){
	var networkServices = angular.module('share.networkServices',[]);
	networkServices.factory('ajaxService',ajaxService);
	networkServices.$inject = ['$http'];
	
	function ajaxService($http){
		var config = {
			headers:{
				'Accept': 'application/json',
				'requestType':'angularJS',
				'Cache-Control': 'no-cach, no-store, must-revalidate',
				'Pragame':'no-catch',
				'Expries': 0,
				action: '',
			},
			params:{}
		};

		var ajaxService = {
			get:get,
			post:post
		};

		return ajaxService;

		function get(url,action,params){
			close.params = params || {};
			config.params["timeStamp"] = (new Date()).getTime();
			config.headers.action = action || '';

			return $http.get(url,config);
		}

		function post(url,data,action,params) {
			close.params = params || {};
			config.params["timeStamp"] = (new Date()).getTime();
			config.headers.action = action || '';

			return $http.post(url,data,config)

		}
	}

}(jQuery))
