var svg;

// waypoints for transportation map
var waypointBike = new Waypoint({
  element: document.querySelector("#triggerBike"),
  handler: function(direction) {
    if(direction === "down") {

      svg = d3.select(map.getPanes().overlayPane).append("svg");

      var g = svg.append("g").attr("class", "leaflet-zoom-hide");

      d3.json('./geodata/bike.geojson', function(collection) {
        var featuresdata = collection.features.filter(function(d) {
          return d.properties.id == "route1"
        })

        var transform = d3.geo.transform({
          point: projectPoint
        });

        var d3path = d3.geo.path().projection(transform);

        var toLine = d3.svg.line()
        .interpolate("linear")
        .x(function(d) {
          return applyLatLngToLayer(d).x
        })
        .y(function(d) {
          return applyLatLngToLayer(d).y
        });

        var ptFeatures = g.selectAll("circle")
        .data(featuresdata)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("class", "waypoints");

        var linePath = g.selectAll(".lineConnect")
        .data([featuresdata])
        .enter()
        .append("path")
        .attr("class", "lineConnect");

        var marker = g.append("svg:image")
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "./media/bike_vector.png")
        .attr("id", "marker");

        var originANDdestination = [featuresdata[0], featuresdata[27]]
        var begend = g.selectAll(".drinks")
        .data(originANDdestination)
        .enter()
        .append("circle", ".drinks")
        .attr("r", 5)
        .style("fill", "steelblue")
        .style("opacity", "1");

        var text = g.selectAll("text")
        .data(originANDdestination)
        .enter()
        .append("text")
        .text(function(d) {
          return d.properties.name
        })
        .attr("class", "locnames")
        .attr("y", function(d) {
          return -10
        })
        .attr("class", "locnames")
        .attr("x", function(d) {
          return -50
        })

        map.on("viewreset", reset);
        reset();
        transition();

        function reset() {
          var bounds = d3path.bounds(collection),
          topLeft = bounds[0],
          bottomRight = bounds[1];

          text.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });
          begend.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });
          ptFeatures.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });

          marker.attr("transform",
          function() {
            var y = featuresdata[0].geometry.coordinates[1]
            var x = featuresdata[0].geometry.coordinates[0]
            return "translate(" +
            map.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
            map.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
          });

          svg.attr("width", bottomRight[0] - topLeft[0] + 120)
          .attr("height", bottomRight[1] - topLeft[1] + 120)
          .style("left", topLeft[0] - 50 + "px")
          .style("top", topLeft[1] - 50 + "px");

          linePath.attr("d", toLine)

          g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");
        }

        function transition() {
          linePath.transition()
          .duration(7500)
          .attrTween("stroke-dasharray", tweenDash);
        }

        function tweenDash() {
          return function(t) {
            var l = linePath.node().getTotalLength();
            interpolate = d3.interpolateString("0," + l, l + "," + l);
            var marker = d3.select("#marker");

            var p = linePath.node().getPointAtLength(t * l);
            marker.attr("transform", "translate(" + p.x + "," + p.y + ")");
            console.log(interpolate(t))
            return interpolate(t);
          }
        }

        function projectPoint(x, y) {
          var point = map.latLngToLayerPoint(new L.LatLng(y, x));
          this.stream.point(point.x, point.y);
        }
      });

      function applyLatLngToLayer(d) {
        var y = d.geometry.coordinates[1]
        var x = d.geometry.coordinates[0]
        return map.latLngToLayerPoint(new L.LatLng(y, x))
      }

    } else if(direction === "up") {
      //console.log('works up')

      svg.selectAll("*").remove();
    }
  }
});

var waypointDrive = new Waypoint({
  element: document.querySelector("#triggerDrive"),
  handler: function(direction) {
    if(direction === "down") {
      // console.log('works down')
      svg.selectAll("*").remove();

      svg = d3.select(map.getPanes().overlayPane).append("svg");

      var g = svg.append("g").attr("class", "leaflet-zoom-hide");

      d3.json('./geodata/drive.geojson', function(collection) {
        var featuresdata = collection.features.filter(function(d) {
          return d.properties.id == "route1"
        })

        var transform = d3.geo.transform({
          point: projectPoint
        });

        var d3path = d3.geo.path().projection(transform);

        var toLine = d3.svg.line()
        .interpolate("linear")
        .x(function(d) {
          return applyLatLngToLayer(d).x
        })
        .y(function(d) {
          return applyLatLngToLayer(d).y
        });

        var ptFeatures = g.selectAll("circle")
        .data(featuresdata)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("class", "waypoints");

        var linePath = g.selectAll(".lineConnect")
        .data([featuresdata])
        .enter()
        .append("path")
        .attr("class", "lineConnect");

        var marker = g.append("svg:image")
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "./media/car_vector.png")
        .attr("id", "marker");

        var originANDdestination = [featuresdata[0], featuresdata[34]]
        var begend = g.selectAll(".drinks")
        .data(originANDdestination)
        .enter()
        .append("circle", ".drinks")
        .attr("r", 5)
        .style("fill", "steelblue")
        .style("opacity", "1");

        var text = g.selectAll("text")
        .data(originANDdestination)
        .enter()
        .append("text")
        .text(function(d) {
          return d.properties.name
        })
        .attr("class", "locnames")
        .attr("y", function(d) {
          return -10
        })
        .attr("class", "locnames")
        .attr("x", function(d) {
          return -50
        })

        map.on("viewreset", reset);
        reset();
        transition();

        function reset() {
          var bounds = d3path.bounds(collection),
          topLeft = bounds[0],
          bottomRight = bounds[1];

          text.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });
          begend.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });
          ptFeatures.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });

          marker.attr("transform",
          function() {
            var y = featuresdata[0].geometry.coordinates[1]
            var x = featuresdata[0].geometry.coordinates[0]
            return "translate(" +
            map.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
            map.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
          });

          svg.attr("width", bottomRight[0] - topLeft[0] + 120)
          .attr("height", bottomRight[1] - topLeft[1] + 120)
          .style("left", topLeft[0] - 50 + "px")
          .style("top", topLeft[1] - 50 + "px");

          linePath.attr("d", toLine)

          g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");
        }

        function transition() {
          linePath.transition()
          .duration(7500)
          .attrTween("stroke-dasharray", tweenDash);
        }

        function tweenDash() {
          return function(t) {
            var l = linePath.node().getTotalLength();
            interpolate = d3.interpolateString("0," + l, l + "," + l);
            var marker = d3.select("#marker");

            var p = linePath.node().getPointAtLength(t * l);
            marker.attr("transform", "translate(" + p.x + "," + p.y + ")");
            console.log(interpolate(t))
            return interpolate(t);
          }
        }

        function projectPoint(x, y) {
          var point = map.latLngToLayerPoint(new L.LatLng(y, x));
          this.stream.point(point.x, point.y);
        }
      });

      function applyLatLngToLayer(d) {
        var y = d.geometry.coordinates[1]
        var x = d.geometry.coordinates[0]
        return map.latLngToLayerPoint(new L.LatLng(y, x))
      }

    } else if(direction === "up") {
      //console.log('works up')

      svg.selectAll("*").remove();
    }
  }
});


var waypointSom = new Waypoint({
  element: document.querySelector("#triggerSom"),
  handler: function(direction) {
    if(direction === "down") {
      // console.log('works down')
      svg.selectAll("*").remove();

      svg = d3.select(map.getPanes().overlayPane).append("svg");

      var g = svg.append("g").attr("class", "leaflet-zoom-hide");

      d3.json('./geodata/t_childrens.geojson', function(collection) {
        var featuresdata = collection.features.filter(function(d) {
          return d.properties.id == "route1"
        })

        var transform = d3.geo.transform({
          point: projectPoint
        });

        var d3path = d3.geo.path().projection(transform);

        var toLine = d3.svg.line()
        .interpolate("linear")
        .x(function(d) {
          return applyLatLngToLayer(d).x
        })
        .y(function(d) {
          return applyLatLngToLayer(d).y
        });

        var ptFeatures = g.selectAll("circle")
        .data(featuresdata)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("class", "waypoints");

        var linePath = g.selectAll(".lineConnect")
        .data([featuresdata])
        .enter()
        .append("path")
        .attr("class", "lineConnect");

        var marker = g.append("svg:image")
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "./media/train_vector.png")
        .attr("id", "marker");

        var originANDdestination = [featuresdata[0], featuresdata[36]]
        var begend = g.selectAll(".drinks")
        .data(originANDdestination)
        .enter()
        .append("circle", ".drinks")
        .attr("r", 5)
        .style("fill", "steelblue")
        .style("opacity", "1");

        var text = g.selectAll("text")
        .data(originANDdestination)
        .enter()
        .append("text")
        .text(function(d) {
          return d.properties.name
        })
        .attr("class", "locnames")
        .attr("y", function(d) {
          return -10
        })
        .attr("class", "locnames")
        .attr("x", function(d) {
          return -50
        })

        map.on("viewreset", reset);
        reset();
        transition();

        function reset() {
          var bounds = d3path.bounds(collection),
          topLeft = bounds[0],
          bottomRight = bounds[1];

          text.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });
          begend.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });
          ptFeatures.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });

          marker.attr("transform",
          function() {
            var y = featuresdata[0].geometry.coordinates[1]
            var x = featuresdata[0].geometry.coordinates[0]
            return "translate(" +
            map.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
            map.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
          });

          svg.attr("width", bottomRight[0] - topLeft[0] + 120)
          .attr("height", bottomRight[1] - topLeft[1] + 120)
          .style("left", topLeft[0] - 50 + "px")
          .style("top", topLeft[1] - 50 + "px");

          linePath.attr("d", toLine)

          g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");
        }

        function transition() {
          linePath.transition()
          .duration(7500)
          .attrTween("stroke-dasharray", tweenDash);
        }

        function tweenDash() {
          return function(t) {
            var l = linePath.node().getTotalLength();
            interpolate = d3.interpolateString("0," + l, l + "," + l);
            var marker = d3.select("#marker");

            var p = linePath.node().getPointAtLength(t * l);
            marker.attr("transform", "translate(" + p.x + "," + p.y + ")");
            console.log(interpolate(t))
            return interpolate(t);
          }
        }

        function projectPoint(x, y) {
          var point = map.latLngToLayerPoint(new L.LatLng(y, x));
          this.stream.point(point.x, point.y);
        }
      });

      function applyLatLngToLayer(d) {
        var y = d.geometry.coordinates[1]
        var x = d.geometry.coordinates[0]
        return map.latLngToLayerPoint(new L.LatLng(y, x))
      }

    } else if(direction === "up") {
      //console.log('works up')

      svg.selectAll("*").remove();
    }
  }
});


var waypointBCEC = new Waypoint({
  element: document.querySelector("#triggerBCEC"),
  handler: function(direction) {
    if(direction === "down") {
      // console.log('works down')
      svg.selectAll("*").remove();

      svg = d3.select(map.getPanes().overlayPane).append("svg");

      var g = svg.append("g").attr("class", "leaflet-zoom-hide");

      d3.json('./geodata/t_bcec.geojson', function(collection) {
        var featuresdata = collection.features.filter(function(d) {
          return d.properties.id == "route1"
        })

        var transform = d3.geo.transform({
          point: projectPoint
        });

        var d3path = d3.geo.path().projection(transform);

        var toLine = d3.svg.line()
        .interpolate("linear")
        .x(function(d) {
          return applyLatLngToLayer(d).x
        })
        .y(function(d) {
          return applyLatLngToLayer(d).y
        });

        var ptFeatures = g.selectAll("circle")
        .data(featuresdata)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("class", "waypoints");

        var linePath = g.selectAll(".lineConnect")
        .data([featuresdata])
        .enter()
        .append("path")
        .attr("class", "lineConnect");

        var marker = g.append("svg:image")
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "./media/train_vector.png")
        .attr("id", "marker");

        var originANDdestination = [featuresdata[0], featuresdata[16]]
        var begend = g.selectAll(".drinks")
        .data(originANDdestination)
        .enter()
        .append("circle", ".drinks")
        .attr("r", 5)
        .style("fill", "steelblue")
        .style("opacity", "1");

        var text = g.selectAll("text")
        .data(originANDdestination)
        .enter()
        .append("text")
        .text(function(d) {
          return d.properties.name
        })
        .attr("class", "locnames")
        .attr("y", function(d) {
          return -10
        })
        .attr("class", "locnames")
        .attr("x", function(d) {
          return -50
        })

        map.on("viewreset", reset);
        reset();
        transition();

        function reset() {
          var bounds = d3path.bounds(collection),
          topLeft = bounds[0],
          bottomRight = bounds[1];

          text.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });
          begend.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });
          ptFeatures.attr("transform",
          function(d) {
            return "translate(" +
            applyLatLngToLayer(d).x + "," +
            applyLatLngToLayer(d).y + ")";
          });

          marker.attr("transform",
          function() {
            var y = featuresdata[0].geometry.coordinates[1]
            var x = featuresdata[0].geometry.coordinates[0]
            return "translate(" +
            map.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
            map.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
          });

          svg.attr("width", bottomRight[0] - topLeft[0] + 120)
          .attr("height", bottomRight[1] - topLeft[1] + 120)
          .style("left", topLeft[0] - 50 + "px")
          .style("top", topLeft[1] - 50 + "px");

          linePath.attr("d", toLine)

          g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");
        }

        function transition() {
          linePath.transition()
          .duration(7500)
          .attrTween("stroke-dasharray", tweenDash);
        }

        function tweenDash() {
          return function(t) {
            var l = linePath.node().getTotalLength();
            interpolate = d3.interpolateString("0," + l, l + "," + l);
            var marker = d3.select("#marker");

            var p = linePath.node().getPointAtLength(t * l);
            marker.attr("transform", "translate(" + p.x + "," + p.y + ")");
            console.log(interpolate(t))
            return interpolate(t);
          }
        }

        function projectPoint(x, y) {
          var point = map.latLngToLayerPoint(new L.LatLng(y, x));
          this.stream.point(point.x, point.y);
        }
      });

      function applyLatLngToLayer(d) {
        var y = d.geometry.coordinates[1]
        var x = d.geometry.coordinates[0]
        return map.latLngToLayerPoint(new L.LatLng(y, x))
      }

    } else if(direction === "up") {
      //console.log('works up')

      svg.selectAll("*").remove();
    }
  }
});
