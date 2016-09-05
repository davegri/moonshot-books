var app = angular.module('Books', ['ngRoute'])

// Routing
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'static/books/templates/list.html',
            controller: 'ListBooks'
        }) 
        .when('/book/:bookId', {
            templateUrl: 'static/books/templates/detail.html',
            controller: 'GetBook'
        }) 
})

// Controllers
function ListBooks($scope, $http, $location) {
    var loadData = function() {
        $http.get('api/books').
            success(function(data) {
                $scope.books = data;
            });
    }
   
    // initial load
    loadData();

    // add a function to scope for navigation
    $scope.navigate = function(path) {
        $location.path(path);
    }

    // add formData and submit functions for adding new books
    $scope.formData = {};
    $scope.submitForm = function() {
        $http.post('api/books/', $scope.formData)
            .then(function() {
                // refresh data
                loadData();
            })
    } 
}

function GetBook($scope, $routeParams, $http, $window) {
    var bookId = $routeParams.bookId;
    var bookUrl = 'api/books/' + bookId + '/';

    var loadData = function () {
        $http.get(bookUrl).
            success(function(data) {
                $scope.book = data;
            });
    }

    //initial load
    loadData();

    $scope.submitForm = function() {
        $http.put(bookUrl, $scope.book)
            .then(function() {
                // refresh data
                loadData();
            })
    } 
    
    $scope.delete = function() {
        $http.delete(bookUrl)
            .then(function() {
                // redirect to list view after delete
                $window.location.href = '/';
            })
    }
}

app.controller('ListBooks', ListBooks);
app.controller('GetBook', GetBook);

