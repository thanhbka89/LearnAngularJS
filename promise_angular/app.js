function getData($timeout, $q) {
    return function() {
        var defer = $q.defer()

        // simulated async function
        $timeout(function() {
            if (Math.round(Math.random())) {
                defer.resolve('data received!')
            } else {
                defer.reject('oh no an error! try again')
            }
        }, 3000)
        return defer.promise
    }
}

//promise chaining
function getDataChainingDemo($timeout, $q) {
    return function() {
        // simulated async function
        return $q(function(resolve, reject) {
            $timeout(function() {
                resolve(Math.floor(Math.random() * 10))
            }, 2000)
        })
    }
}

angular.module('app', [])
    .factory('getData', getData)
    .run(function(getData) {
        var promise = getData()
            .then(
                /* success function */
                function(string) {
                    console.log(string)
                },
                /* error function */
                function(err) {
                    console.log(err);
                }
            )
    })
    .factory('getDataChaining', getDataChainingDemo)
    .run(function(getDataChaining) {
        var promise = getDataChaining()
            .then(function(num) {
                console.log(num);
                return num * 2
            })
            .then(function(num) {
                console.log(num);
            })
    })
