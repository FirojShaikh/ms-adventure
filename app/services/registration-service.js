var mongoose = require('mongoose');
var Registration=mongoose.model('Registration');

function RegistrationService(){

}

RegistrationService.prototype.register=function(req,res,done){

	var registrationDetails=new Registration();

	registrationDetails.firstName=req.body.firstName;
	registrationDetails.mi=req.body.mi;
	registrationDetails.lastName=req.body.lastName;
	registrationDetails.gender=req.body.gender;

	registrationDetails.dateOfBirth=req.body.dateOfBirth;
	registrationDetails.stn=req.body.stn;
	registrationDetails.ethinicity=req.body.ethinicity;
	registrationDetails.otherEthinicity=req.body.otherEthinicity;
	registrationDetails.email=req.body.email;
	registrationDetails.address=req.body.address;
	registrationDetails.city=req.body.city;
	registrationDetails.state=req.body.state;
	registrationDetails.zip=req.body.zip;
	registrationDetails.cellPhone=req.body.cellPhone;
	registrationDetails.twitterHandle=req.body.twitterHandle;
	registrationDetails.facebookPage=req.body.facebookPage;
	registrationDetails.tshirtSize=req.body.tshirtSize;

	registrationDetails.studenLiveWith=req.body.studenLiveWith;
	registrationDetails.studentLiveWithOther=req.body.studentLiveWithOther;

	registrationDetails.guardian1.firstName=req.body.guardian1.firstName;
	registrationDetails.guardian1.lastName=req.body.guardian1.lastName;
	registrationDetails.guardian1.guardianType=req.body.guardian1.guardianType;
	registrationDetails.guardian1.haveSameAddressWithStudent=req.body.guardian1.haveSameAddressWithStudent;
	registrationDetails.guardian1.address=req.body.guardian1.address;
	registrationDetails.guardian1.city=req.body.guardian1.city;
	registrationDetails.guardian1.state=req.body.guardian1.state;
	registrationDetails.guardian1.zip=req.body.guardian1.zip;
	registrationDetails.guardian1.homePhone=req.body.guardian1.homePhone;
	registrationDetails.guardian1.workPhone=req.body.guardian1.workPhone;
	registrationDetails.guardian1.cellPhone=req.body.guardian1.cellPhone;

	registrationDetails.guardian2.firstName=req.body.guardian2.firstName;
	registrationDetails.guardian2.lastName=req.body.guardian2.lastName;
	registrationDetails.guardian2.guardianType=req.body.guardian2.guardianType;
	registrationDetails.guardian2.haveSameAddressWithStudent=req.body.guardian2.haveSameAddressWithStudent;
	registrationDetails.guardian2.address=req.body.guardian2.address;
	registrationDetails.guardian2.city=req.body.guardian2.city;
	registrationDetails.guardian2.state=req.body.guardian2.state;
	registrationDetails.guardian2.zip=req.body.guardian2.zip;
	registrationDetails.guardian2.homePhone=req.body.guardian2.homePhone;
	registrationDetails.guardian2.workPhone=req.body.guardian2.workPhone;
	registrationDetails.guardian2.cellPhone=req.body.guardian2.cellPhone;

	registrationDetails.currentSchoolName=req.body.currentSchoolName;
	registrationDetails.currentGrade=req.body.currentGrade;
	registrationDetails.hsGraduationYear=req.body.hsGraduationYear;
	registrationDetails.gpa=req.body.gpa;

	registrationDetails.careerInterest.accountingOrFinance=req.body.careerInterest.accountingOrFinance;
	registrationDetails.careerInterest.education=req.body.careerInterest.education;
	registrationDetails.careerInterest.architectureOrConstruction=req.body.careerInterest.architectureOrConstruction;
	registrationDetails.careerInterest.businessOrEnterpreneurship=req.body.careerInterest.businessOrEnterpreneurship;
	registrationDetails.careerInterest.communicationOrMedia=req.body.careerInterest.communicationOrMedia;
	registrationDetails.careerInterest.computerInformationTechnology=req.body.careerInterest.computerInformationTechnology;
	registrationDetails.careerInterest.engineering=req.body.careerInterest.engineering;
	registrationDetails.careerInterest.law=req.body.careerInterest.law;
	registrationDetails.careerInterest.medicalField=req.body.careerInterest.medicalField;
	registrationDetails.careerInterest.other=req.body.careerInterest.other;
	registrationDetails.careerInterest.performingArtsOrCreativeCareers=req.body.careerInterest.performingArtsOrCreativeCareers;
	registrationDetails.careerInterest.sports=req.body.careerInterest.sports;
	registrationDetails.careerInterest.undecided=req.body.careerInterest.undecided;

	registrationDetails.specificCareerField=req.body.specificCareerField;
	registrationDetails.firstTimeELI=req.body.firstTimeELI;

	registrationDetails.howDidYouHear.alumni=req.body.howDidYouHear.alumni;
	registrationDetails.howDidYouHear.church=req.body.howDidYouHear.church;
	registrationDetails.howDidYouHear.cldEvent=req.body.howDidYouHear.cldEvent;
	registrationDetails.howDidYouHear.communityEventOrOrganization=req.body.howDidYouHear.communityEventOrOrganization;
	registrationDetails.howDidYouHear.newspaper=req.body.howDidYouHear.newspaper;
	registrationDetails.howDidYouHear.other=req.body.howDidYouHear.other;
	registrationDetails.howDidYouHear.radio=req.body.howDidYouHear.radio;
	registrationDetails.howDidYouHear.school=req.body.howDidYouHear.school;
	registrationDetails.howDidYouHear.socialMedia=req.body.howDidYouHear.socialMedia;
	registrationDetails.howDidYouHear.tv=req.body.howDidYouHear.tv;
	registrationDetails.howDidYouHear.walkIn=req.body.howDidYouHear.walkIn;
	registrationDetails.howDidYouHear.website=req.body.howDidYouHear.website;

	registrationDetails.howDidYouHearOtherWay=req.body.howDidYouHearOtherWay;

	registrationDetails.numberOfIndividualsInHousehold=req.body.numberOfIndividualsInHousehold;
	registrationDetails.anualHouseholIncome=req.body.anualHouseholIncome;
	
	registrationDetails.programs.foodStamps=req.body.programs.foodStamps;
	registrationDetails.programs.medicaid=req.body.programs.medicaid;
	registrationDetails.programs.none=req.body.programs.none;
	registrationDetails.programs.ssdi=req.body.programs.ssdi;
	registrationDetails.programs.ssi=req.body.programs.ssi;
	registrationDetails.programs.tanf=req.body.programs.tanf;
	registrationDetails.programs.veteransCompensation=req.body.programs.veteransCompensation;

	registrationDetails.childReceiveFreeOrReducedLunch=req.body.childReceiveFreeOrReducedLunch;

	registrationDetails.agreed=req.body.agreed;
	registrationDetails.printName=req.body.printName;
	registrationDetails.printDate=req.body.printDate;

	registrationDetails.status='Pending';

	console.log(registrationDetails);

	registrationDetails.save(function(err){
		console.log(err);
		return done(err);
	});
};

module.exports = new RegistrationService();