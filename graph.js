$(document).ready(function(){
	users = createSmallUserGraph();
	console.log('Number of users: ');

	$("#totalInfectionSubmit").on('click', function(){
		user_id = int($("#startUser"));
		infect_user = findUser(user_id);
		infectionID = Math.floor(Math.random() * 100);
		total_infection = infect_user.total_infection(infectionID);
		console.log('Infected Users:' + total_infection.length);
	});

	$("#limitedInfectionSubmit").on('click', function(){
		user_id = int($("#startUserLimit").val());
		limit = int($("#limit").val());
		infect_user = findUser(user_id);
		limited_infection = limitInfection(infect_user, limit);
	});


});

function createSmallUserGraph(){
	//create a small connected graph

}

function findUser(){

}