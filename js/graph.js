$(document).ready(function(){
	usersGraph = createUserGraph(30);
	data = createVizStruct(usersGraph.users);
	makeViz(data);

	$("#totalInfectionSubmit").click(function(e){
	    user_id = parseInt($("#startUser").val());
	    infect_user = usersGraph.getUser(user_id);
	    infectionID = Math.floor(Math.random() * 10000);
	    if(infect_user === null){
	        console.log("ID doesn't exist, try another one.")
	    }
	    else{
	        total_infection = infect_user.totalInfection(infectionID);
	        $("svg").remove();
	        makeViz(data);
	    }
		if(!e.isDefaultPrevented()) e.preventDefault();
		e.stopPropagation();
	});
	$("#limitedInfectionSubmit").click(function(e){
		user_id = parseInt($("#startUserLimit").val());
		limit = parseInt($("#limit").val());
		infect_user = usersGraph.getUser(user_id);
		if(infect_user === null){
			console.log("ID doesn't exist, try another one.");
		}
		else{
			limited_infection = infect_user.beginLimitedInfection(infect_user, limit);
			$("svg").remove();
			makeViz(data);
		}
		if(!e.isDefaultPrevented()) e.preventDefault();
		e.stopPropagation();
	});
});



function createUserGraph(size){
	//create a small connected graph
	ids = [];
	for (var i = 0; i < size; i++){
		ids.push(i);
	}
	graph = new Component();
	graph.createUsers(ids);
	c1 = graph.getUser(1);
	c2 = graph.getUser(2);
	c3 = graph.getUser(3);
	c1.addStudents(graph.getUsers([4, 5, 6]));
	c2.addStudents(graph.getUsers([7, 8, 9]));
	c3.addStudents(graph.getUsers([10, 11, 12]));
	return graph
}

function createVizStruct(users){
	//create nodes
	graph_obj = {};
	nodes = [];
	links = [];
	for (var i = 0; i < users.length; i++){
		nodes.push({name:'k', num: users[i].id, info:users[i]});
		students = users[i].students;
		for (var j = 0; j < students.length; j++){
			links.push({source:users[i].id, target:students[j].id});
		}
	}
	graph_obj.nodes = nodes;
	graph_obj.links = links;
	return graph_obj;
}

function makeViz(obj){
	var width = 960,
	    height = 500;

	var force = d3.layout.force()
	    .charge(-60)
	    .linkDistance(100)
	    .size([width, height])
	    .nodes(obj.nodes)
	    .links(obj.links)
	    .start();

	var svg = d3.select("#visualization").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	    // Per-type markers, as they don't inherit styles.
    svg.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("refX", 6 + 3) /*must be smarter way to calculate shift*/
    .attr("refY", 2)
    .attr("markerWidth", 6)
    .attr("markerHeight", 4)
    .attr("orient", "auto")
    .append("path")
        .attr("d", "M 0,0 V 4 L6,2 Z");

	var link = svg.selectAll(".link")
				.data(force.links())
				.enter().append("line")
				  .attr("class", "link")
				  .attr("marker-end", "url(#arrowhead)")
				  .style("stroke-width", 2);

	var node = svg.selectAll(".node")
      .data(force.nodes())
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 10)
      .style("fill", function(d) { if (d.info.infected){
      									 return 'blue';
      									}
      								else
      									{return 'green';} 
      							})
      .call(force.drag);


      node.append("text")
          .text(function(d) { return d.num; });

      force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
	  });
}


