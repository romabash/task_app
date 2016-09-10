
(function(){
  'use strict';
  
  var app = angular.module('myApp', []);
  
  app.controller('myCtrl', function($scope){
    $scope.products = [];
	  $scope.placeholder = "Enter a task here";
	
	  $scope.addItem = function(){
	    $scope.errorText = "";
	    if(!$scope.addMe){ return; }
	    if($scope.products.indexOf($scope.addMe) === -1 ){ //checks index of addMe (-1 if not in array)
        $scope.products.push($scope.addMe);
	      $scope.addMe = "";
	    }
	    else{
		    $scope.errorText = "Item alrady in the list";
		    $scope.addMe = "";
	    }
	  }
	  $scope.removeItem = function(x){
	    $scope.errorText = "";
	    $scope.products.splice(x,1);
	  }
  });
  
})(); 



