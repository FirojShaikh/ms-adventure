(function(){
	'use strict';

	angular
		.module('besmartapp.events')
		.controller('EventsController',['$scope','$http','$filter',
				function($scope,$http,$filter){
					$scope.selectedFileName="";

					$scope.event={};
					$scope.event.schedule={};
					$scope.event.schedule.dateTime=new Date();

					$scope.hstep = 1;
				  	$scope.mstep = 1;

				  	$scope.eventSchedule=[];
				  	$scope.ismeridian = true;
				  	$scope.isAuthenticationFailed=false;

					$scope.open=function($event){
						$event.preventDefault();
						$event.stopPropagation();

						$scope.opened=!$scope.opened;
					};

					$scope.addEventSchedule=function($event,eventSchedule){
						$event.preventDefault();
						$event.stopPropagation();

						var schedule={
							dateTime:eventSchedule.dateTime,
							duration:eventSchedule.duration
						};

						$scope.eventSchedule.push(schedule);
					};

					$scope.removeEventSchedule=function($event,schedule){
						$event.preventDefault();
						$event.stopPropagation();

						var index = $scope.eventSchedule.indexOf(schedule);
  						$scope.eventSchedule.splice(index, 1);  
					};

					$scope.uploadComplete=function(file){
						//console.log(file);
						$scope.selectedFileName=file.name;
					};

					$scope.cancelUpload=function(){
						//
						console.log('cancelled');
						$scope.selectedFileName="";	
					}

					$scope.createEvent=function(event){
						
						var eventToCreate={
							title:event.title,
							category:event.category,
							purpose:event.purpose,
							location:event.location,
							date:$filter('date')(event.date, 'mediumDate'),
							image:$scope.selectedFileName,
							eventSchedule:$scope.eventSchedule,
							isActive:true
						};

						$http
							.post('/besmartapi/events',eventToCreate)
							.success(function(data,status,headers,config){

								console.log(data);
								if(data.status=="success"){
									$scope.showEventCreatedMessage=true;
									console.log('event created successfully',data);	
								}
								else{
									$scope.showEventCreatedMessage=false;
									if(data.isAuthenticated==false){
										$scope.isAuthenticationFailed=true;
									}
									console.log('event creation failed', data);	
								}
								
							})
							.error(function(data,status,headers,config){
								$scope.showEventCreatedMessage=false;
								console.log('event creation failed', data);
							});
					}

					$scope.init=function(){
						//some init code here
					};

					$scope.init();
	}]);

})();