(function(){
	'use strict';

	angular
		.module('besmartapp.footer')
		.controller('FooterController',['$scope','$http',
				function($scope,$http){

					$scope.init=function(){

						$scope.popularEvents=[];

						$http
							.get('/besmartapi/events/popular')
							.success(function(data,status,headers,config){
								if(data.status=="success"){
									var popularEvents=[];
									for (var index in data.events) {
										popularEvents.push({
											id:data.events[index]._id,
											date:new Date(data.events[index].eventSchedule[0].dateTime),
											title:data.events[index].title,
											image:'content/events/'+data.events[index].image,
											url:"#/event-detail?eventId=" + data.events[index]._id
										});
									    console.log( data.events[index] );
									}

									$scope.popularEvents=popularEvents;
								}
								else{
									console.log('Popular Events: GET failed', data);	
								}
							})
							.error(function(data,status,headers,config){
								console.log('Popular Events: GET failed', data);
							});
					};

					$scope.init();
	}]);

})();