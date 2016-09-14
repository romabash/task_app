
(function(){
  'use strict';
  
  var app = angular.module('myApp', []);
  
  app.controller('myCtrl', function($scope){
    
    $scope.placeholder = "Enter a task here";  
    //Check to see if Local Storage is supported and assigns products to it or empty array
    if (typeof(Storage) !== "undefined") {
      $scope.products = JSON.parse(localStorage.getItem("tasks")) || [];
    } else {
      $scope.products = [];
    }

	  $scope.addItem = function(){
	    $scope.errorText = "";
	    if(!$scope.addMe){ return; }
	    if($scope.products.indexOf($scope.addMe) === -1 ){ //checks index of addMe (-1 if not in array)
        $scope.products.push($scope.addMe);
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("tasks", JSON.stringify($scope.products));
        } 
	      $scope.addMe = "";
	    }
	    else{
		    $scope.errorText = "Item already in the list";
		    $scope.addMe = "";
	    }
	  }
	  $scope.removeItem = function(x){
	    $scope.errorText = "";
	    $scope.products.splice(x,1);
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("tasks", JSON.stringify($scope.products));
      } 
	  }
    $scope.removeAll = function(){
      $scope.products = [];
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("tasks", JSON.stringify($scope.products));
      } 
    }
  });
  
})(); 



