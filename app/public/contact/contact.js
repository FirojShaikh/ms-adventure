(function(){
	'use strict';

	angular
		.module('besmartapp.contact')
		.controller('ContactController',['$scope','$http','$timeout',
			
				function($scope,$http,$timeout){
					var vm=this;

					vm.name='';
					vm.email='';
					vm.subject='';
					vm.message='';

					vm.contactSuccessMessage=false;
					vm.contactSuccess=false;
					vm.contactFailed=false;
					vm.failedmessage='';

					vm.submitContact=function(){

						if(vm.subject==''){
							vm.subject="Quick Contact";
						}

						$http
							.post('/besmartapi/contacts',vm)
							.success(function(data,status,headers,config){

								if(data.status=="success"){
									console.log('Contact save successful',data);
									vm.name='';
									vm.email='';
									vm.subject='';
									vm.message='';

									vm.contactSuccess=true;
									vm.contactFailed=false;
									$timeout(function() {
						                vm.contactSuccess=false;
						            }, 5000);
								}
								else{
									console.log('Contact save failed', data);	
									vm.contactSuccess=false;
									vm.contactFailed=true;
									$timeout(function() {
						                vm.contactFailed=false;
						            }, 5000);

						            vm.failedmessage='Contact save failed';
								}
							})
							.error(function(data,status,headers,config){
								console.log('Contact save failed', data);
								vm.contactSuccess=false;
								vm.contactFailed=true;
								$timeout(function() {
					                vm.contactFailed=false;
					            }, 5000);

					             vm.failedmessage='fatal: Contact save failed';
							});
					};

					vm.init=function(){
						// some initialization code here
					};

					vm.init();
	}]);

})();