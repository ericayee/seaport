/*

Template for Waypoint trigger:

var WAYPOINT = new Waypoint({
  element: document.querySelector(SELECTION),
  handler: function(direction) {
    if(direction === "down") {

      <-- ACTION GOES HERE FOR DOWNWARD SCROLLING-->

    } else if(direction === "up") {

      <-- ACTION GOES HERE FOR UPWARD SCROLLING -->

    }
  }
});

*/

var waypoint1a = new Waypoint({
  element: document.querySelector("#trigger1a"),
  handler: function(direction) {
    if(direction === "down") {
		document.querySelector("#photo").src = "images/boston-common.jpg";
    } else if(direction === "up") {
		document.querySelector("#photo").src = "images/back-bay.jpg";

    }
  }
});

var waypoint1b = new Waypoint({
  element: document.querySelector("#trigger1b"),
  handler: function(direction) {
    if(direction === "down") {
		document.querySelector("#photo").src = "images/brownstone.jpg";
    } else if(direction === "up") {
		document.querySelector("#photo").src = "images/boston-common.jpg";

    }
  }
});

var waypoint2 = new Waypoint({
  element: document.querySelector("#trigger2"),
  handler: function(direction) {
    if(direction === "down") {
      d3.selectAll(".rentBar")
        .attr("fill",function(d) {
          if(d.area === "Back Bay") {
            return "red";
          } else {
            return "steelblue";
          }
        });
    } else if(direction === "up") {
      d3.selectAll(".rentBar")
        .attr("fill", "steelblue");
    }
  }
});

var waypoint3 = new Waypoint({
  element: document.querySelector("#trigger3"),
  handler: function(direction) {
    if(direction === "down") {

      d3.select(".animateCircle")
        .transition()
        .duration(500)
        .attr("r",200)
        .attr("fill","green");

    } else if(direction === "up") {

      d3.select(".animateCircle")
        .transition()
        .duration(500)
        .attr("r",50)
        .attr("fill","red");

    }
  }
});
