(function(){
	'use strict';

	angular
		.module('besmartapp.topnav')
		.controller('TopnavController',['$scope','$location',
				function($scope,$location){

					$scope.isActive=function(viewLocation){
						return viewLocation === $location.path();
					};

					$scope.init=function(){

					};

					$scope.init();
	}]);

})();