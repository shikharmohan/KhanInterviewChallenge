/*Creating a connected component object, basically a database. 
* Makes creating d3 graph easier
*/
	function Component() {
		this.users = [];
		this.coaches = []; //creators of components, keep track
	}

	Component.prototype.createUsers = function(list) {
		//assume list has only unique integers, otherwise we make list a set
		for(var i = 0; i < list.length; i++){
			user = new User(list[i])
			this.addUser(user);
		}
	};

	Component.prototype.addUser = function(user){
		user.Component = this;
		this.users.push(user);
	};

	Component.prototype.getUser = function(user_id){
		users = this.users;
		found_user = null;
		for(var i = 0; i < users.length; i++){
			if(users[i].id === user_id){
				found_user = users[i];
				break;
			}
		}
		return found_user;
	};

	Component.prototype.getUsers = function(list){
		users = [];
		for(var i = 0; i < list.length; i++){
			user = this.getUser(list[i])
			if(user !== null){
				users.push(user);
			}
		}
		return users;
	};

	Component.prototype.addCoach = function(){
		if((this.coaches.indexOf(coach)) === -1){
			return this.coaches.push(coach);
		}
	};

	Component.prototype.numInfectedUsers = function(){
		var count = 0;
		users = this.users;
		for(var i = 0; i < users.length; i++){
			if(users[i].infected){
				count++;
			}
		}
		return count;
	};



	function User(id){
		this.id = id;
		this.coaches = [];
		this.students = [];
		this.infected = false;
		this.infectionID = 0;
		this.Component = null;
	}

	User.prototype.addStudent = function(student) {
		//student not found
		if((this.students.indexOf(student)) === -1){
			this.students.push(student);
			student.addCoach(this);
		}	
	};

	User.prototype.isStudent = function() {
	  if (this.coaches.length > 0) {
	    return true;
	  } else {
	    return false;
	  }
	};

	User.prototype.addCoach = function(coach) {
		//coach not found
		if((this.coaches.indexOf(coach)) === -1){
			this.coaches.push(coach);
			return coach.addStudent(this);
		}
	};

	User.prototype.infect = function(){
		//modifying this for limited infection
		this.infected = true;
	}

	//this function takes in an infection ID to make sure we aren't infecting the same nodes twice
	User.prototype.totalInfection = function(infectID) {
		var count = 0;
		//base case -- InfectionID keeps from inf loop
		if(this.infectionID !== infectID){
			this.infectionID = infectID;
			this.infect();
			count++;
			std = this.students;
			for (var i = 0; i < std.length; i++){
				student = std[i];
				//recurse on students!
				count += student.totalInfection(infectID);
			}
			coaches = this.coaches
			for (var i = 0; i < coaches.length; i++){
				coach = coaches[i];
				//recurse! 
				count += coach.totalInfection(infectID);
			}	
		}
		return count;
	};
	User.prototype.limitedInfection = function(infectID) {
		//infect current user & students if any
		var count = 0;
		if (this.infectionID !== infectID){
			this.infectionID = infectID;
			if(!this.infected){
				this.infect();
				count++;
			}
			//infect students
			std = this.students;
			for(var i = 0; i < std.length; i++){
				student = std[i];
				count += student.limitedInfection(infectID);
			}
		}
		return count;
	};

	User.prototype.uninfectedCount = function() {
		// return number of infected students
		// total students - infected students
		var infectIDTotal = Math.ceil(Math.random() * 10000);
		var total = totalStudentsHelper(infectID);
		var infectIDInf = Math.ceil(Math.random() * 10000);
		var infected = totalInfectedHelper(infectIDInf);

		return total-infected;
	};

	User.prototype.totalStudentsHelper = function(infectID) {
		var count = 0;
		if(this.infectionID !== infectID){
			this.infectionID = infectID;
			count++;
			students = this.students;
			for(var i = 0; i < students.length; i++){
				student = students[i];
				//recurse! 
				count += student.totalStudentsHelper(infectID);
			}
		}
		return count;
	};

	User.prototype.totalInfectedHelper = function(infectID) {
		var count = 0
		if(this.infectionID !== infectID){
			this.infectionID = infectID;
			if(this.infected){
				count++;
			}
			students = this.students;
			for(var i = 0; i < students.length; i++){
				student = students[i];
				count += student.totalInfectedHelper(infectID);
			}
		}
		return count;
	};

	User.prototype.beginLimitedInfection = function(limit) {
		infectionID = Math.floor(Math.random() * 10000);
		//get count of infections on first limit
		var count = this.limitedInfection(infectionID);
		limit -= count;

		//need to find coach that gives us exactly limit infections
		while(limit > 0){
			coach = findExactCoach(this.Component.coaches);
			if (coach !== null){
				ct = coach.limitedInfection(infectionID);
				count += ct;
				limit -= ct;
			}
			else{
				break;
			}
		}
		return count;
	};

	findExactCoach = function(coaches){
		currCoach = null;
		currCoachNumUninfected = -1;
		for(var i = 0; i < coaches.length; i++){
			coach = coaches[i];
			numUninfected = coaches.uninfectedCount();
			if((!coach.infected ||  numUninfected !== 0) && numUninfected >currCoachNumUninfected){
				currCoachNumInfected = numUninfected;
				currCoach = coach;
			}
		}
		return currCoach;
	}
