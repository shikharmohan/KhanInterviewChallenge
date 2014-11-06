$(document).ready(function(){
	users = createGraph(5);
	console.log('Number of users: ');

	$("#totalInfectionSubmit").on('click', function(){
		user_id = int($("#startUser"));
		infect_user = users.getUser(user_id);
		infectionID = Math.floor(Math.random() * 10000);
		total_infection = infect_user.total_infection(infectionID);
		console.log('Infected Users:' + total_infection.length);
	});

	$("#limitedInfectionSubmit").on('click', function(){
		user_id = int($("#startUserLimit").val());
		limit = int($("#limit").val());
		infect_user = users.getUser(user_id);
		limited_infection = limitInfection(infect_user, limit);

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
	}

}


function createGraph(size){
	//create a small connected graph

}

function findExactCoach(coaches){
	currCoach = null;
	currCoachNumInfected = -1;
	for(var i = 0; i < coaches.length; i++){
		coach = coaches[i];
		if((!coach.infected   )){

		}
	}
}