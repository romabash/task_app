
(function(){
  'use strict';
	
  angular.module('TaskList')
  .component('welcomeTask', {
    templateUrl: 'src/tasklist/templates/welcome.template.html',
	bindings: {
	  addMe: '=' //2-directional
	} 
  });
	
})();