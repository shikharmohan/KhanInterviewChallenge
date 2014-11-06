/*Creating a connected component object, basically a database. 
* Makes creating d3 graph easier
*/
var Component = (function(){

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


	return Component;

});








var User = (function(){
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
		//modifying this for limited infection
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
		}
		return results;
	};
	User.prototype.limitedInfection = function(infectID) {
		//infect current user & students if any
		var count = 0;
		if (if this.infectionID !== infectID){
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

	return User;
});
