(function(){
	'use strict';

	angular
		.module('besmartapp.registration')
		.controller('RegistrationController',['$http',
				function($http){
					var vm=this;

					vm.firstName='';
					vm.mi='';
					vm.lastName='';
					vm.gender='';

					vm.dateOfBirth=new Date();
					vm.stn='';
					vm.ethinicity='';
					vm.otherEthinicity='';
					vm.email='';
					vm.address='';
					vm.city='';
					vm.state='';
					vm.zip='';
					vm.cellPhone='';
					vm.twitterHandle='';
					vm.facebookPage='';
					vm.tshirtSize='';

					vm.studenLiveWith='';
					vm.studentLiveWithOther='';

					vm.guardian1={};
					vm.guardian1.firstName='';
					vm.guardian1.lastName='';
					vm.guardian1.guardianType='';

					vm.guardian1.haveSameAddressWithStudent='yes';
					vm.guardian1.address='';
					vm.guardian1.city='';
					vm.guardian1.state='';
					vm.guardian1.zip='';
					vm.guardian1.homePhone='';
					vm.guardian1.workPhone='';
					vm.guardian1.cellPhone='';

					vm.guardian2={};
					vm.guardian2.firstName='';
					vm.guardian2.lastName='';
					vm.guardian2.guardianType='';

					vm.guardian2.haveSameAddressWithStudent='yes';
					vm.guardian2.address='';
					vm.guardian2.city='';
					vm.guardian2.state='';
					vm.guardian2.zip='';
					vm.guardian2.homePhone='';
					vm.guardian2.workPhone='';
					vm.guardian2.cellPhone='';

					vm.currentSchoolName='';
					vm.currentGrade='';
					vm.hsGraduationYear='';
					vm.gpa='';

					vm.careerInterest={
						accountingOrFinance: false,
						education: false,
						architectureOrConstruction: false,
						businessOrEnterpreneurship: false,
						communicationOrMedia: false,
						computerInformationTechnology: false,
						engineering: false,
						law: false,
						medicalField: false,
						other: false,
						performingArtsOrCreativeCareers: false,
						sports: false,
						undecided: false
					};

					vm.specificCareerField='';

					vm.firstTimeELI='';

					vm.howDidYouHear={
						alumni: false,
						church: false,
						cldEvent: false,
						communityEventOrOrganization: false,
						newspaper: false,
						other: false,
						radio: false,
						school: false,
						socialMedia: false,
						tv: false,
						walkIn: false,
						website: false
					};

					vm.howDidYouHearOtherWay='';

					vm.numberOfIndividualsInHousehold='';
					vm.anualHouseholIncome='';

					vm.programs={
						foodStamps: false,
						medicaid: false,
						none: false,
						ssdi: false,
						ssi: false,
						tanf: false,
						veteransCompensation: false
					};

					vm.childReceiveFreeOrReducedLunch='';

					vm.agreed='';
					vm.printName='';
					vm.printDate=new Date();

					vm.openDobCalendar=function($event){
						$event.preventDefault();
						$event.stopPropagation();

						console.log("calendarOpen");
						vm.dobCalendarOpened=!vm.dobCalendarOpened;
					};

					vm.openPrintDateCalendar=function($event){
						$event.preventDefault();
						$event.stopPropagation();

						vm.printDateCalendarOpened=!vm.printDateCalendarOpened;
					};

					vm.register=function(){
						console.log(vm); 

						$http
							.post('/besmartapi/registrations',vm)
							.success(function(data,status,headers,config){

								console.log(data);
								if(data.status=="success"){
									console.log('Registeration successful',data);
									vm.registrationSuccessful=true;
								}
								else{
									console.log('Registeration failed', data);	
									vm.registrationSuccessful=false;
									vm.failedMessage="Registration failed";
								}
							})
							.error(function(data,status,headers,config){
								console.log('Registeration failed', data);
								vm.registrationSuccessful=false;
								vm.failedMessage="Fatal: Registration failed";
							});
					};

					vm.init=function(){
						//console.log("init firoj");
					};

					vm.init();
				}]);

})();