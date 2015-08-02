(function() {
    'use strict';

    angular
        .module('besmartapp.layout')
   		.controller('HomesliderController',HomesliderController);

	var HomesliderController=function (){
		var vm=this;

		vm.isVisible=false;

		vm.hideMainScreen=function(){
			vm.isVisible=false;
		}
	}
})();