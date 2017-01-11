var app = angular.module("mainApp", ["ngResource", 'ngCookies']);

var logMyName = (function (name) {
    console.log(name); // Todd
})('Todd');


app.controller('SumController', ['$scope', function($scope){
	console.log($scope);
    console.log(this);
    $scope.sum = 0;      
	$scope.sum_ab = function(){
		$scope.sum = $scope.num_a + $scope.num_b;
	}
    $scope.$watch('sum',function(newValue, oldValue){
        console.log(oldValue + ':'+newValue);
    });
}]);

//Controller As
app.controller('DemoAs', function($scope){
    var self = this;

    self.title = 'Demo title';
    self.name = 'thanhbka';  

    self.changeMessage = function(message){
        self.name = message;
    };  
    $scope.$watch(angular.bind(self, function() {
        return self.name;
    }), function(newVal, oldVal){
        console.log(oldVal);
    });
});
//Cách 1 : Tạo service
app.service('CalculatorService', function(){
 
	// Cung cấp chức năng tính tổng 2 số a và b
	this.add = function(a, b) { return a + b };

	// Cung cấp chức năng tính hiệu 2 số a và b
	this.subtract = function(a, b) { return a - b };

	// Cung cấp chức năng tính tích 2 số a và b
	this.multiply = function(a, b) { return a * b };

	// Cung cấp chức năng tính thương 2 số a và b
	this.divide = function(a, b) { return a / b };
});

app.controller('CalculatorController', function($scope, CalculatorService){// inject (tiêm) đối tượng CalculatorService
 
	$scope.result = 0;

	$scope.add = function(){
	 	$scope.result = CalculatorService.add($scope.a, $scope.b);
	}

	$scope.subtract = function(){
	 	$scope.result = CalculatorService.subtract($scope.a, $scope.b);
	}

	$scope.multiply = function (){
	 	$scope.result = CalculatorService.multiply($scope.a, $scope.b);
	}

	$scope.divide = function(){
	 	$scope.result = CalculatorService.divide($scope.a, $scope.b);
    }
});

app.controller('FormController', function($scope) {      
	$scope.submitForm = function(isValid) {
		// Kiểm tra nếu form ok, thì xuất thông báo
		if (isValid) {
			console.log($scope.name + $scope.username + $scope.email);
		  	alert('Form Validation thành công');
		}else{
		  	alert('Error'); 
		}
	};
});

//Cách 2 : Tạo service
//afactory to consume webservices and return data to controllers.
app.factory('WebServices',['$http', function($http){
    return {
        getFriends : function(){
            return  $http.get('/demo/get.php').then(function(response){ //wrap it inside another promise using then
                        return response.data;  //only return friends 
                    });
        }
    }

    //Cách 2
    /*This is an example of how you can process and return the required result*/
  //   var obj = {};
  //   obj.getOverallUserInfo = function(){ 
  //       return $http.get('mockjson/userprofile.json').then(function(response){   //returns a call back
  //           this.userDetails = response.data;                                       //store data of 1st call in this.userDetails
  //           return $http.get('mockjson/userfriendlist.json').then(function(response){ //returns a call back
  //               this.userDetails.friends = response.data.userfriends;               //Append the response of second call to the data we stored previously
  //               return this.userDetails;                                    //Return processed result.
  //           });
  //       });
  //   }
 	// return obj;
}]);

app.controller('WebController', ['WebServices', '$scope', function(WebServices, $scope){
    $scope.resultData = [];

	WebServices.getFriends().then(function(response){ 
        $scope.friends = response; //Assign data received to $scope.data
        angular.forEach(response, function(row) {
          $scope.resultData.push({
            "email": row.email,
            'author': row.author
          });
        });
    });
}]);

//Lets add a controller to our directive
app.directive('myDirective', [function () {
	return {
        restrict:'AEC',
        scope:{}, //isolate scope
        template:'<label>My Directive: <input type="text" ng-model="userinput" ng-change="invoked()" class="form-control"/><label>'
        			+'<p>{{displaytext}} : {{userinput}}</p>',
        controller:function($scope){
            $scope.displaytext = 'Waiting for user to type';
            $scope.invoked = function(){       //Will call this function on change and update the value of displaytext variable.
                $scope.displaytext = 'User Typed';
            }
        }
    }
}]);

app.controller('FoodCtrl', function($scope){

    $scope.foodItems = [{
        name:'Noodles',
        price:'10',
        quantity:'1'
    },
    {
        name:'Pasta',
        price:'20',
        quantity:'2'
    },
    {
        name:'Pizza',
        price:'30',
        quantity:'1'
    },
    {
        name:'Humbeger',
        price:'30',
        quantity:'5'
    },
    {
        name:'Chicken tikka',
        price:'100',
        quantity:'1'
    }];

    $scope.selectedRow = null;  // initialize our variable to null
	$scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
	 	$scope.selectedRow = index;
	}

});

app.filter('searchFor', function(){
    return function(arr, searchString){console.log(searchString);
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.name.toLowerCase().indexOf(searchString) !== -1){
            result.push(item);
        }
        });
        return result;
    };
});

app.controller('CookieCtrl', ['$cookies', '$cookieStore', function($cookies, $cookieStore){
    $cookies.thanhbka = 'demo123';    
    console.log($cookies);

    $cookieStore.put('myFavorite', 'oatmeal');
    // Get cookie
    var favoriteCookie = $cookieStore.get('myFavorite');
    console.log($cookieStore);
    console.log(favoriteCookie);
}])

