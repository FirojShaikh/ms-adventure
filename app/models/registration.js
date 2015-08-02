var mongoose = require('mongoose');

var registrationSchema = new mongoose.Schema({
	
	firstName:String,
	mi:String,
	lastName:String,
	gender:String,

	dateOfBirth:{type:Date},
	stn:Number,
	ethinicity:String,
	otherEthinicity:String,
	email:String,
	address:String,
	city:String,
	state:String,
	zip:String,
	cellPhone:String,
	twitterHandle:String,
	facebookPage:String,
	tshirtSize:String,

	studenLiveWith:String,
	studentLiveWithOther:String,

	guardian1:{
		firstName:String,
		lastName:String,
		guardianType:String,
		haveSameAddressWithStudent:String,
		address:String,
		city:String,
		state:String,
		zip:String,
		homePhone:String,
		workPhone:String,
		cellPhone:String
	},

	guardian2:{
		firstName:String,
		lastName:String,
		guardianType:String,
		haveSameAddressWithStudent:String,
		address:String,
		city:String,
		state:String,
		zip:String,
		homePhone:String,
		workPhone:String,
		cellPhone:String
	},

	currentSchoolName:String,
	currentGrade:String,
	hsGraduationYear:String,
	gpa:String,

	careerInterest:{
		accountingOrFinance: Boolean,
		education: Boolean,
		architectureOrConstruction: Boolean,
		businessOrEnterpreneurship: Boolean,
		communicationOrMedia: Boolean,
		computerInformationTechnology: Boolean,
		engineering: Boolean,
		law: Boolean,
		medicalField: Boolean,
		other: Boolean,
		performingArtsOrCreativeCareers: Boolean,
		sports: Boolean,
		undecided: Boolean
	},

	specificCareerField:String,

	firstTimeELI:String,

	howDidYouHear:{
		alumni: Boolean,
		church: Boolean,
		cldEvent: Boolean,
		communityEventOrOrganization: Boolean,
		newspaper: Boolean,
		other: Boolean,
		radio: Boolean,
		school: Boolean,
		socialMedia: Boolean,
		tv: Boolean,
		walkIn: Boolean,
		website: Boolean
	},

	howDidYouHearOtherWay:String,

	numberOfIndividualsInHousehold:Number,
	anualHouseholIncome:Number,

	programs:{
		foodStamps: Boolean,
		medicaid: Boolean,
		none: Boolean,
		ssdi: Boolean,
		ssi: Boolean,
		tanf: Boolean,
		veteransCompensation: Boolean
	},

	childReceiveFreeOrReducedLunch:Boolean,

	agreed:String,
	printName:String,
	printDate:{type: Date},

	status:String,
	created_at:{type: Date,default: Date.now}
});

mongoose.model("Registration",registrationSchema);