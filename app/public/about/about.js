(function(){
	'use strict';

	angular
		.module('besmartapp.about')
		.controller('HomesliderController',HomesliderController);

	var HomesliderController=function (){
		var vm=this;

		vm.isVisible=false;

		vm.hideMainScreen=function(){
			vm.isVisible=false;
		}
	}

})();