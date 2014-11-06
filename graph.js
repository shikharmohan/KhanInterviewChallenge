$(document).ready(function(){
	users = createSmallUserGraph();
	console.log('Number of users: ');
	$("#totalInfectionSubmit").on('submit', function(){
		user_id = $("#startUser");
		infect_user = findUser(user_id);
		infectionID = Math.floor(Math.random() * 100);
		total_infection = infect_user.total_infection(infectionID);
		console.log('Infected Users:' + total_infection.length);
	});




});

function createSmallUserGraph(){
	//create a small connected graph

}

function findUser(){

}