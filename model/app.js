var app = angular.module('App', []);

//Sharing a model between controllers
app.factory('Book', ['$http', function($http) {  
	//construct
    //Way 1
    var Book = function(bookData) {
        this.canTalk = true;
        if (bookData)
            this.setData(bookData);
    }
    //Way 2
    // function Book(bookData) {
    //     if (bookData)
    //         this.setData(bookData);                
    // };
    //Way 3
    //function Book(firstName, lastName, role) {
	//     // Public properties, assigned to the instance ('this')
	//     this.firstName = firstName;
	//     this.lastName = lastName;
	//     this.role = role;	
	// }

    //public method
    Book.prototype = {
        setData: function(bookData) {
            angular.extend(this, bookData);
            console.log('Test: ' + this.isAvailable());
            console.log(this);
        },
        load: function(id) {
            var scope = this;
            $http.get('/model/load.php?action=get&id=' + id).then(function(bookData) {console.log(scope);
                scope.setData(bookData.data);console.log(scope);
            });                     
        },        
        isAvailable: function() {
            if (!this.stores || this.stores.length === 0) {
                return false;
            }
            return this.stores.some(function(store) {
                return store.quantity > 0;
            });
        }        
    };

    //private property
    var possibleRoles = ['admin', 'editor', 'guest'];

    //private function
    function checkRole(role) {
	    return possibleRoles.indexOf(role) !== -1;
	}
	/**
	* Static property
	* Using copy to prevent modifications to private property
	*/
    Book.possibleRoles = angular.copy(possibleRoles);

	/**
	* Static method, assigned to class
	* Instance ('this') is not available in static context
	*/
    Book.build = function (data) {
	   	if (!checkRole(data.role)) {
	   		return;
	   	}
	   	return new Book(data);
    };

    return Book;
}]);

app.factory('booksManager', ['$http', '$q', 'Book', function($http, $q, Book) {  
    var booksManager = {
        _pool: {},
        _retrieveInstance: function(bookId, bookData) {
            var instance = this._pool[bookId];
 
            if (instance) {
                instance.setData(bookData);
            } else {
                instance = new Book(bookData);
                this._pool[bookId] = instance;
            }
 
            return instance;
        },
        _search: function(bookId) {
            return this._pool[bookId];
        },
        _load: function(bookId, deferred) {
            var scope = this;
 
            $http.get('/model/load.php?action=get&id=' + bookId)
                .success(function(bookData) {
                    var book = scope._retrieveInstance(bookData.id, bookData);
                    deferred.resolve(book);
                })
                .error(function() {
                    deferred.reject();
                });
        },
        /* Public Methods */
        /* Use this function in order to get a book instance by it's id */
        getBook: function(bookId) {
            var deferred = $q.defer();
            var book = this._search(bookId);
            if (book) {
                deferred.resolve(book);
            } else {
                this._load(bookId, deferred);
            }
            return deferred.promise;
        },
        /* Use this function in order to get instances of all the books */
        loadAllBooks: function() {
            var deferred = $q.defer();
            var scope = this;
            $http.get('/model/load.php?action=getAll')
                .success(function(booksArray) {
                    var books = [];
                    booksArray.forEach(function(bookData) {
                        var book = scope._retrieveInstance(bookData.id, bookData);
                        books.push(book);
                    });
 
                    deferred.resolve(books);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        },
        /*  This function is useful when we got somehow the book data and we wish to store it or update the pool and get a book instance in return */
        setBook: function(bookData) {
            var scope = this;
            var book = this._search(bookData.id);
            if (book) {
                book.setData(bookData);
            } else {
                book = scope._retrieveInstance(bookData);
            }
            return book;
        },
 
    };
    return booksManager;
}]);

app.controller('BookController', ['$scope', 'Book', function($scope, Book) {    
    $scope.book = new Book();
    console.log($scope.book);
    $scope.book.load(1); 
    console.log($scope.book);
    $scope.show = function(){
        console.log('Show scope');
    }

    function showMessages() {
    	console.log('Show message!');
    } 
    showMessages();  
    $scope.show();

    function func(x){
       console.log(typeof x, arguments.length);
    }
    func();                //==> "undefined", 0
    func(1);               //==> "number", 1
    func("1", "2", "3");   //==> "string", 3
    console.log(Book.possibleRoles);
    function print() {
        console.log(this.mVal)
    }
     
    var obj = {
        mVal: "Tôi yêu thành phố Hồ Chí Minh",
     
        mMethod: function(callback) {
            // truyền đối tượng hiện tại cho hàm phản hồi callback
            callback.call(this)
        }
    }
     
    obj.mMethod(print)
}]);

app.controller('OtherBookController', ['$scope', 'booksManager', function($scope, booksManager) {    
    booksManager.getBook(2).then(function(book) {
        $scope.book = book
    });    
}]);


app.factory('SimpleGithubUser', function($http) {

    var apiUrl = 'https://api.github.com/';

    // instantiate our initial object
    var SimpleGithubUser = function(username) {
        this.username = username;
        this.profile = null;
    };

    // define the getProfile method which will fetch data
    // from GH API and *returns* a promise
    SimpleGithubUser.prototype.getProfile = function() {

        // Generally, javascript callbacks, like here the $http.get callback,
        // change the value of the "this" variable inside it
        // so we need to keep a reference to the current instance "this" :
        var self = this;

        return $http.get(apiUrl + 'users/' + this.username).then(function(response) {

            // when we get the results we store the data in user.profile
            self.profile = response.data
            
            // promises success should always return something in order to allow chaining
            return response;

        });
    };
    return SimpleGithubUser;
});

// we define a new factory and inject our original service so we can extend it properly
app.factory('AdvancedGithubUser', function($http, SimpleGithubUser) {

    var apiUrl = 'https://api.github.com/';

    // create our new custom object that reuse the original object constructor
    var AdvancedGithubUser = function() {
        SimpleGithubUser.apply(this, arguments);
    };

    // reuse the original object prototype
    AdvancedGithubUser.prototype = new SimpleGithubUser();

    // define a new internal private method for this object
    function getUserEvents() {
        var self = this;
        return $http.get(apiUrl + 'users/' + this.username + '/events').then(function(response) {

            // attach the events API result to our user profile
            self.profile.events = response.data;

            // promises should always return a result
            return response;
        });
    }

    // Now let's override our original getProfile method
    AdvancedGithubUser.prototype.getProfile = function() {

        var self = this;

        // we first call the original getProfile method (aka super method)
        var originalGetProfile = SimpleGithubUser.prototype.getProfile.apply(this, arguments);

        // we use promises chaining to add additional data
        return originalGetProfile.then(function() {

            // before returning the result,
            // call our new private method and bind "this" to "self"
            // we need to do this because the method is not part of the prototype
            return getUserEvents.call(self);
        });
    };
    return AdvancedGithubUser;
});

app.service('MyUserProfile', function(AdvancedGithubUser) {
    var user = new AdvancedGithubUser('revolunet');
    user.getProfile();
    return user;
});

// we first inject our factory
app.controller('MyCtrl', function(SimpleGithubUser, $scope, AdvancedGithubUser, MyUserProfile) {
    // instantiate a new user
    var user = new SimpleGithubUser('substack');
    // fetch data and publish on scope
    user.getProfile().then(function() {
        $scope.userLogin = user.profile.login;
    });

    // instantiate a new user
    var userAdvance = new AdvancedGithubUser('thanhbka89');
    // fetch data and publish on scope
    userAdvance.getProfile().then(function() {
        $scope.userEvents = userAdvance.profile.events;
    });

    $scope.user = MyUserProfile;

    $scope.users = [];

    $scope.fetchUsers = function () {
        $scope.users = [];
        var users = ['mhevery', 'igorminar', 'btford', 'substack', 'sindresorhus', 'n1k0', 'revolunet', 'thanhbka89'];

        users.forEach(function (userName) {
            var user = new AdvancedGithubUser(userName);
            user.getProfile().then(function () {
                $scope.users.push(user);
            });
        });
    };
});
