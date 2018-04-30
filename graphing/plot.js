/* implementation heavily influenced by http://bl.ocks.org/1166403 */

// define dimensions of graph
var m = [80, 80, 80, 80]; // margins
var w = 1000 - m[1] - m[3]; // width
var h = 400 - m[0] - m[2]; // height

// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
// var data1 = [10, 9, 6, 7, 5, 2, 5, 3, 8, 9, 3, 5, 9, 3, 6, 3, 6, 6, 7, 5, 3, 4, 3, 8, 9, 6, 5, 9, 8, 7];
// var data2 = [10, 5, 1, 4, 3, 1, 0, 2, 4, 6, 1, 3, 4, 1, 0, 1, 3, 1, 3, 3, 1, 0, 2, 3, 6, 1, 4, 6, 2, 6];

var num_years = 10;
// var num_categories = 7;
// var orig_pop = 43075, orig_add = 26692, orig_LOS = 1.9, orig_data = [orig_pop];
// for (var i = 0; i < num_years; i++) {
    // orig_pop = populationStep(orig_pop, orig_add, orig_LOS);
    // orig_data.push(orig_pop);
// }
// original line
// currently random hardcoded data; need to change to actual population numbers
orig_data = [43075, 46201, 48048, 49140, 49784, 50165, 50390, 50523, 50601, 50648, 50675];
mod_data_1 = [43075, 41201, 43048, 44140, 44784, 45165, 45390, 45523, 45601, 45648, 45675];
mod_data_2 = [43075, 36201, 33048, 39140, 34784, 40165, 35390, 40523, 35601, 40648, 35675];
mod_data_3 = [43075, 29201, 23048, 24140, 30784, 30165, 32390, 33523, 30601, 30648, 29675];


// X scale will fit all values from data[] within pixels 0-w
var x = d3.scale.linear().domain([0, orig_data.length]).range([0, w]);
// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
// var y = d3.scale.linear().domain([0, 10]).range([h, 0]);
// automatically determining max range can work something like this
var ymax = d3.max(orig_data);
var y = d3.scale.linear().domain([0, ymax]).range([h, 0]);

// create a line function that can convert data[] into x and y points
var line = d3.svg.line()
  // assign the X function to plot our line as we wish
  .x(function(d,i) {
    // verbose logging to show what's actually being done
    console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
    // return the X coordinate where we want to plot this datapoint
    return x(i);
  })
  .y(function(d) {
    // verbose logging to show what's actually being done
    console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
    // return the Y coordinate where we want to plot this datapoint
    return y(d);
  })
// Add an SVG element with the desired dimensions and margin.
var graph = d3.select("#graph").append("svg:svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .append("svg:g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
// create yAxis
var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
// Add the x-axis.
graph.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);
// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
// Add the y-axis to the left
graph.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(-25,0)")
      .call(yAxisLeft);


var indices = d3.range(orig_data.length)
var zeroes = []
var ones = []
for (var i = 0; i < orig_data.length; i++) {
  zeroes.push(0)
  ones.push(ymax)
}


function plotLines(data, xscale, yscale) {
  var colors = ["black", "green", "blue", "red", "yellow", "orange"];
  var num_lines = data.length;
  // plotting the lines
  for (var i = 0; i < num_lines; i++) {
    graph.append("svg:path").attr("d", line(data[i])).attr("fill", "none").attr("stroke", colors[i]);
  }
  // shading the area
  for (var i = 0; i < num_lines - 1; i++) {
    var area = d3.svg.area()
      // .interpolate("cardinal")
      .x0( function(d) { return xscale(d) } )
      .x1( function(d) { return xscale(d) } )
      .y0( function(d) { return h-yscale(data[i][d]) } )
      .y1( function(d) { return h-yscale(data[i+1][d]) } );

    graph.append('path')
      .datum(indices)
      .attr('class', 'area')
      .attr('fill', colors[i+1])
      .attr('opacity', 0.2)
      .attr('d', area);
  }
  // putting circles at each data point
  for (var i = 0; i < num_lines; i++) {
    for (var j = 0; j < data[i].length; j++) {
      var point = graph.append("svg:g");
      var x = xscale(j);
      var y = h-yscale(data[i][j]);

      point.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("x", x - 1)
        .attr("y", y - 3)
        .attr("fill", colors[i]);
      point.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 4)
        .attr("fill", colors[i]);

      point.on("click", function(d) {
        var current = d3.select(this);
        var circ = current.select("circle");
        var textbox = current.select("text");
        var op = (circ.attr("opacity") == 0.2) ? 1.0 : 0.2;
        var label = (circ.attr("opacity") == 0.2) ? "" : ("(" + circ.attr("cx") + "," + circ.attr("cy") + ")");
        circ.attr("opacity", op);
        textbox.text(label);
        });
    }
  }

}

var xscale = d3.scale.linear()
   .range([0, w / orig_data.length])
   .domain(indices);

var yscale = d3.scale.linear()
  .range([0, h])
  .domain([0, ymax]);


// plotLines([ones, data1, data2], xscale, yscale);
plotLines([orig_data, mod_data_1, mod_data_2, mod_data_3], xscale, yscale);
