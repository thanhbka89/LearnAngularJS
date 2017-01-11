var app = angular.module("myapp", ["otherModule", "angular-loading-bar"]);

app.controller("HeaderController", function($scope, $rootScope) {
	$scope.data = {
		title : 'các bạn tre?',
		website : 'freetuts.net'
	};
    $rootScope.message = 'Hello everyone';
});

app.controller('WebsiteInfomation', function($scope){    

    $scope.data = {
        fullname : 'Nguyen Mai Thanh',
        email : 'thanhbka@yahoo.com',
        phone : '0979 306 603',
        topic : 'Học lập trình online miễn phí',
        website : "freetuts.net"
    };
});

app.controller('MyController', ['$scope', function($scope)
{
    $scope.sayHello = function() {
      $scope.greeting = 'Xin chào ' + $scope.username + '!';
    };
}]);

app.controller('TopController', function ($scope){
    $scope.name = 'demo';
});

app.controller('GreetController', function ($scope){
    $scope.name = 'demo tut';
});

app.controller('ListController', function ($scope){

});

app.controller('Controller1', function ($scope){
    $scope.name = 'Welcome to blog';
}).directive('myDirective', function() { //tu tao directive
    return {
        template: '<h1>Chào mừng các bạn đến với website freetuts.net</h1>'
    };
});

app.controller('Controller2', function ($scope){
    // Khởi tạo giá trị ban đầu
    $scope.message = {
        title : 'Trò Chơi Tính Toán',
        num1 : 'Số thứ nhất',
        num2: 'Số thứ Hai',
        phep_cong : "Cộng hai số:",
        phep_tru : "Trừ hai số:",
        phep_nhan : "Nhân hai số:",
        phep_chia : "Chia hai số:"
    };
    // vì ban đầu chưa nhập gì nên ẩn khung kết quả
    $scope.styleresult = 'display:none';

    // Khi nhập các số vào các input thì gọi sự kiện này
    $scope.show_result = function()
    {
        // Nếu validate form đúng
        if ($scope.calForm.$valid){
            $scope.styleresult = 'display:block';
            $scope.result = {
                phep_cong : parseInt($scope.so_thu_nhat) + parseInt($scope.so_thu_hai),
                phep_tru : parseInt($scope.so_thu_nhat) - parseInt($scope.so_thu_hai),
                phep_nhan : parseInt($scope.so_thu_nhat) * parseInt($scope.so_thu_hai),
                phep_chia : parseInt($scope.so_thu_nhat) / parseInt($scope.so_thu_hai)
            };
        }
        // nếu validate form sai thì ẩn result
        else {
            $scope.styleresult = 'display:none';
        }
    };
});

app.controller('Controller3', ['$scope', function($scope){
    // Khởi tạo giá trị ban đầu cho list = [];
    $scope.list = [];
     
    // Khi submit form thì chạy hàm này
    $scope.submit = function()
    {
        // nếu người dùng có nhập nội dung thì lưu nó vào list
        if ($scope.text)
        {
            $scope.list.push(this.text);
             
            // đồng thời xóa dữ liệu trong thẻ input
            $scope.text = '';
        }
    };

    // Khi submit form thì chạy hàm này
    $scope.login = function()
    {
        if ($scope.myFormLogin.$valid){
            // nếu người dùng có nhập nội dung thì lưu nó vào list
            if ($scope.username == 'admin' && $scope.password == '123456'){
                alert('Đăng Nhập Thành Công');
            }
            else {
                alert('Đăng Nhập Thất Bại');
            }
        }else{
            alert('Not valid');
        }
    };

}]);

app.controller('DateController', ['$scope', function($scope){
    $scope.value = new Date();
}]);

app.controller('Controller4', ['$scope', function($scope){
    $scope.your_age = 20;
    $scope.checkAge = function()
    {
        if ($scope.your_age >= 20){
            return true;
        }
        return false;
    };
}]);

app.controller('LoopController', ['$scope', function($scope){
    $scope.items = ['redis', 'mongo', 'mysql', 'sqlite', 'ubuntu', 'linux'];
    $scope.users = {name : 'thanhnguyen', age: 24};
}]);

app.controller('InitController', ['$scope', function($scope){
    
}]);

// Khai báo controller
app.controller('ServiceController', ['$scope','kiem_tra_so_chan', 'nhan_doi', function ($scope, kiem_tra_so_chan, nhan_doi)
{
    $scope.xuat_thong_bao = function() {
        kiem_tra_so_chan($scope.number);
        nhan_doi($scope.number);
    };
}]);
 
// Tạo service kiểm tra số chẵn
app.factory('kiem_tra_so_chan', function($window)
{
    return function(number)
    {
        if (number % 2 == 0) {
            $window.alert("Số " + number + " là số chẵn");
        }
    };
});

app.service('nhan_doi', function($window){
    return function(number){
        $window.alert('Nhan doi: ' + number*2);
    };
});

app.controller('Controller5', ['$scope', function($scope){
    
}]);

app.controller('Controller6', ['$scope', function($scope){
    $scope.count = 0;

    $scope.TangBienCount = function () {
        $scope.count++;
    };
}]);