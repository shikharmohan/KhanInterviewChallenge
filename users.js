User = (function(){
	function User(id){
		this.id = id;
		this.coaches = [];
		this.students = [];
		this.infected = false;
		this.infectionID = 0;
	}

	User.prototype.addStudent = function(student) {
		//student not found
		if((this.coaches.indexOf(student))){
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
		this.infected = true;
	}

	//this function takes in an infection ID to make sure we aren't infecting the same nodes twice
	User.prototype.totalInfection = function(infectID) {
		var results = [];
		if(this.infectionID !== infectID){
			this.infectionID = infectID;
			this.infect();
			std = this.students;
			for (s in std){
				student = std[s];
				student.totalInfection(infectID);
			}
			coaches = this.coaches
			for (c in coaches){
				coach = coaches[c];
				results.push(coach.totalInfection(infectID));
			}
			return results;
		}
	};

	
});
