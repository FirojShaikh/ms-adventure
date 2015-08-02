(function(){
	'use strict';

	angular
		.module('besmartapp.events')
		.controller('EventDetailController',['$scope','$http','$filter','$stateParams',
				function($scope,$http,$filter,$stateParams){

					$scope.init=function(){

						$scope.title='';
						$scope.image='';
						$scope.purpose='';
						$scope.category='';

						$http
							.get('/besmartapi/events/'+$stateParams.eventId)
							.success(function(data,status,headers,config){
								if(data.status=="success"){
									console.log('event GET successfully',data);
									$scope.title=data.event.title;
									$scope.imageUrl="content/events/"+data.event.image;
									$scope.purpose=data.event.purpose;
									$scope.location=data.event.location;
									$scope.eventSchedule=data.event.eventSchedule;
									$scope.category=data.event.category;
								}
								else{
									console.log('events GET failed', data);	
								}
							})
							.error(function(data,status,headers,config){
								console.log('event GET failed', data);
							});

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

						$scope.eventCategories=[];

						$http
							.get('/besmartapi/events/categories/count')
							.success(function(data,status,headers,config){
								if(data.status=='success'){
									var eventCategories=[];

									for(var index in data.result){
										eventCategories.push({
											name:data.result[index]._id,
											count:data.result[index].count
										});
									}

									$scope.eventCategories=eventCategories;
								}
								else{
									console.log('Event Categories GET failed');
								}
							})
							.error(function(data,status,headers,config){
								console.log('Event Categories GET failed');
							});
					};

					$scope.init();
	}]);

})();