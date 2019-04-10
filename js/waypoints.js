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
  element: document.querySelector("#triggerBike"),
  handler: function(direction) {
    if(direction === "down") {
      console.log('works down')
		// document.querySelector("#photo").src = "images/boston-common.jpg";
    } else if(direction === "up") {
      console.log('works up')
		// document.querySelector("#photo").src = "images/back-bay.jpg";

    }
  }
});
