$(document).ready(function(){
	users = createGraph(30);
	console.log('Number of users: ');
	$("#totalInfectionSubmit").click(function(e){
	    user_id = parseInt($("#startUser").val());
	    infect_user = users.getUser(user_id);
	    infectionID = Math.floor(Math.random() * 10000);
	    if(infect_user === null){
	        console.log("ID doesn't exist, try another one.")
	    }
	    else{
	        total_infection = infect_user.totalInfection(infectionID);
	        console.log('Infected Users:' + total_infection);
	    }
	    e.preventDefault();
	});
	$("#limitedInfectionSubmit").click(function(e){
		user_id = parseInt($("#startUserLimit").val());
		limit = parseInt($("#limit").val());
		infect_user = users.getUser(user_id);
		if(infect_user === null){
			console.log("ID doesn't exist, try another one.");
		}
		else{
			limited_infection = limitInfection(infect_user, limit);
			console.log('Infected Users:' + limited_infection);
		}
		e.preventDefault();
	});
});


function limitInfection(user, limit){
	infectionID = Math.floor(Math.random() * 10000);
	//get count of infections on first limit
	var count = user.limitInfection(infectionID);
	limit -= count;

	//need to find coach that gives us exactly limit infections
	while(limit > 0){
		coach = findExactCoach(user.Component.coaches, limit);
		if (coach !== null){
			ct = coach.limitInfection(infectionID);
			count += ct;
			limit -= ct;
		}
		else{
			break;
		}
	}
	return count;
}


function createGraph(size){
	//create a small connected graph
	ids = [];
	for (var i = 1; i < size+1; i++){
		ids.push(i); //ids start at 1
	}
	graph = new Component();
	graph.createUsers(ids);
	c1 = graph.getUser(1);
	c2 = graph.getUser(2);
	s3 = graph.getUser(3);
	c1.addStudent(c2);
	c2.addStudent(s3);
	return graph
}

function findExactCoach(coaches){
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

