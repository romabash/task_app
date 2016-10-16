
(function(){
  'use strict';
	
  angular.module('TaskList')
  .service('StorageService', StorageService);

  function StorageService(){
    var service = this;
    
    //loads data from LocalStorage
    service.load = function(){
      var load = JSON.parse(localStorage.getItem("tasks")) || [];
      return load;
    };
    
    //saves data to LocalStorage
    service.save = function(items){
      localStorage.setItem("tasks", JSON.stringify(items));
    };
  }
	
})();