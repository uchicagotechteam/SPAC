/* implementation heavily influenced by http://bl.ocks.org/1166403 */

// define dimensions of graph
var m = [80, 80, 80, 80]; // margins
var w = 1000 - m[1] - m[3]; // width
var h = 600 - m[0] - m[2]; // height

// create a simple data array that we'll plot with a line (this array represents
// only the Y values, X will just be the index location) var data1 = [10, 9, 6,
// 7, 5, 2, 5, 3, 8, 9, 3, 5, 9, 3, 6, 3, 6, 6, 7, 5, 3, 4, 3, 8, 9, 6, 5, 9, 8,
// 7]; var data2 = [10, 5, 1, 4, 3, 1, 0, 2, 4, 6, 1, 3, 4, 1, 0, 1, 3, 1, 3, 3,
// 1, 0, 2, 3, 6, 1, 4, 6, 2, 6];

var num_years = 10;
// var num_categories = 7; var orig_pop = 43075, orig_add = 26692, orig_LOS =
// 1.9, orig_data = [orig_pop]; for (var i = 0; i < num_years; i++) { orig_pop =
// populationStep(orig_pop, orig_add, orig_LOS); orig_data.push(orig_pop); }
// original line currently random hardcoded data; need to change to actual
// population numbers
orig_data = [
  43075,
  46201,
  48048,
  49140,
  49784,
  50165,
  50390,
  50523,
  50601,
  50648,
  50675
];
mod_data_1 = [
  43075,
  41201,
  43048,
  44140,
  44784,
  45165,
  45390,
  45523,
  45601,
  45648,
  45675
];
mod_data_2 = [
  43075,
  36201,
  33048,
  39140,
  34784,
  40165,
  35390,
  40523,
  35601,
  40648,
  35675
];
mod_data_3 = [
  43075,
  29201,
  23048,
  24140,
  30784,
  30165,
  32390,
  33523,
  30601,
  30648,
  29675
];
var data4 = []
for (var i = 0; i < mod_data_3.length; i++) {
  data4.push(.8 * mod_data_3[i]);
}
var data5 = []
for (var i = 0; i < data4.length; i++) {
  data5.push(.7 * data4[i]);
}
var data6 = []
for (var i = 0; i < data5.length; i++) {
  data6.push(.6 * data5[i]);
}
var data7 = []
for (var i = 0; i < data6.length; i++) {
  data7.push(.5 * data6[i]);
}

// X scale will fit all values from data[] within pixels 0-w
var x = d3
  .scaleLinear()
  .domain([0, orig_data.length])
  .range([0, w]);
// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain
// for the y-scale: bigger is up!) var y = d3.scale.linear().domain([0,
// 10]).range([h, 0]); automatically determining max range can work something
// like this
var ymax = d3.max(orig_data);
var y = d3
  .scaleLinear()
  .domain([0, ymax])
  .range([h, 0]);

// create a line function that can convert data[] into x and y points
var line = d3
  .line()
  // assign the X function to plot our line as we wish
  .x(function (d, i) {
    // verbose logging to show what's actually being done
    console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
    // return the X coordinate where we want to plot this datapoint
    return x(i);
  })
  .y(function (d) {
    // verbose logging to show what's actually being done
    console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
    // return the Y coordinate where we want to plot this datapoint
    return y(d);
  })
// Add an SVG element with the desired dimensions and margin.
var graph = d3
  .select("#graph")
  .append("svg:svg")
  .attr("width", w + m[1] + m[3])
  .attr("height", h + m[0] + m[2])
  .append("svg:g")
  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
// create yAxis
var xAxis = d3
  .axisBottom(x)
  .tickSize(-h)
  // .tickSubdivide(true);
// Add the x-axis.
graph
  .append("svg:g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis);
// create left yAxis
var yAxisLeft = d3
  .axisLeft(y)
  .ticks(4)
// Add the y-axis to the left
graph
  .append("svg:g")
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

function updateData(lines, xscale, yscale) {

  graph
    .selectAll('.line')
    .data(lines)
    // .update()
    .attr("d", function (d) {
      console.log("COOOOOOOOOOOOOOL! \n\n\n\nswitching the lines!", d.line_data);
      return line(d.line_data);
    })
    .attr("fill", "none")
    .attr("stroke", function (d) {
      console.log("COOOOOOOOOOOOOOL! \n\n\n\nswitching the lines!", d.line_data);
      return d.color;
    });

  var area = d3
    .area()
    .x0(function (d, i) {
      return xscale(i);
    })
    .x1(function (d, i) {
      return xscale(i);
    })
    .y0(function (d) {
      return h - yscale(d[0]);
    })
    .y1(function (d) {
      return h - yscale(d[1]);
    });

  var pairLines = function (lines) {
    var to_return = [];
    for (let i = 0; i < lines.length - 1; i++) {
      var next = [];
      // console.log("THIS IS!!!!!!!",lines[0].line_data.length);
      for (let j = 0; j < lines[0].line_data.length; j++) {
        // console.log("PUSHING" ,(lines[i].line_data[j], lines[i + 1].line_data[j]));
        next.push([
          lines[i].line_data[j],
          lines[i + 1].line_data[j]
        ]);
      }
      console.log(next);
      to_return.push({color: lines[i].color, area_data: next});
    }
    return to_return;
  }

  var nextGraph = graph
    .selectAll('.area')
    .data(pairLines(lines));

  nextGraph
    .attr('class', 'area')
    .attr('opacity', 0.5)
    .attr('fill', function (d) {
      console.log("PLOTTING WITh COLOR", d.color);
      return d.color;
    })
    .attr("d", function (d) {
      console.log("PLOTTING SECOND data ", d.area_data);
      return area(d.area_data);
    })

}

function plotLines(lines, xscale, yscale) {
  var colors = [
    "black",
    "rgb(57, 151, 170)",
    "rgb(95, 49, 148)",
    "rgb(45, 42, 127)",
    "rgb(47, 142, 59)",
    "rgb(131, 44, 60)",
    "rgb(184, 90, 61)",
    "rgb(172, 57, 150)"
  ];

  // plotting the lines

  graph
    .selectAll('.line')
    .data(lines)
    .enter()
    .append("svg:path")
    .attr("d", function (d) {
      return line(d.line_data);
    })
    .attr("fill", "none")
    .attr("stroke", function (d) {
      return d.color;
    })
    .attr("class", "line");

  // shading the area

  var area = d3
    .area()
    .x0(function (d, i) {
      return xscale(i);
    })
    .x1(function (d, i) {
      return xscale(i);
    })
    .y0(function (d) {
      return h - yscale(d[0]);
    })
    .y1(function (d) {
      return h - yscale(d[1]);
    });

  var pairLines = function (lines) {
    var to_return = [];
    for (let i = 0; i < lines.length - 1; i++) {
      var next = [];
      console.log("THIS IS!!!!!!!", lines[0].line_data.length);
      for (let j = 0; j < lines[0].line_data.length; j++) {
        // console.log("PUSHING" ,(lines[i].line_data[j], lines[i + 1].line_data[j]));
        next.push([
          lines[i].line_data[j],
          lines[i + 1].line_data[j]
        ]);
      }
      console.log(next);
      to_return.push({color: lines[i].color, area_data: next});
    }
    return to_return;
  }

  graph
    .selectAll('.area')
    .data(pairLines(lines))
    .enter()
    .append('path')
    .attr('class', 'area')
    .attr('opacity', 0.5)
    .attr('fill', function (d) {
      console.log("PLOTTING WITh COLOR", d.color);
      return d.color;
    })
    .attr("d", function (d) {
      console.log("PLOTTING data ", d.area_data);
      return area(d.area_data);
    })

  //   //shading the area   for (var i = 0; i < num_lines - 1; i++) {     let area
  // = d3       .svg       .area() // .interpolate("cardinal")     .x0(function
  // (d) {     return xscale(d)     })     .x1(function (d) {       return
  // xscale(d)     })     .y0(function (d) {       return h - yscale(data[i][d])
  // })     .y1(function (d) {       return h - yscale(data[i + 1][d])     });
  // graph     .append('path')     .datum(indices)     .attr('class', 'area')
  // .attr('fill', colors[i + 1])     .attr('opacity', 0.5)     .attr('d', area);
  // } // putting circles at each data point for (var i = 0; i < num_lines; i++) {
  // for (var j = 0; j < data[i].length; j++) {   var point =
  // graph.append("svg:g");   var x = xscale(j);   var y = h - yscale(data[i][j]);
  //   point     .append("text")     .attr("font-family", "sans-serif")
  // .attr("font-size", "12px")     .attr("x", x - 1)     .attr("y", y - 3)
  // .attr("fill", colors[i]);   point     .append("circle")     .attr("cx", x)
  // .attr("cy", y)     .attr("r", 4)     .attr("fill", colors[i]);
  // point.on("click", function (d) {     var current = d3.select(this);     var
  // circ = current.select("circle");     var textbox = current.select("text");
  // var op = (circ.attr("opacity") == 0.2)       ? 1.0       : 0.2;     var label
  // = (circ.attr("opacity") == 0.2)       ? ""       : ("(" + circ.attr("cx") +
  // "," + circ.attr("cy") + ")");     circ.attr("opacity", op);
  // textbox.text(label);   }); } }

}

var xscale = d3
  .scaleLinear()
  .range([
    0, w / orig_data.length
  ])
  .domain(indices);

var yscale = d3
  .scaleLinear()
  .range([0, h])
  .domain([0, ymax]);

// plotLines([ones, data1, data2, data3, data4, data5, data6, data7], xscale,
// yscale); plotLines([ones, data1, data2], xscale, yscale);
plotLines([
  {
    line_data: orig_data,
    color: 'blue'
  }, {
    line_data: mod_data_1,
    color: 'red'
  }, {
    line_data: mod_data_2,
    color: 'orange'
  }, {
    line_data: mod_data_3,
    color: 'blue'
  }
], xscale, yscale);

setTimeout(function () {
  var transform = function (a) {
    var b = [];
    for (let i = 0; i < a.length; i++) {
      b.push(a[i] * .5);
    }
    return b;
  }
  var orig_data2 = transform(orig_data);
  var mod_data_12 = transform(mod_data_1);
  var mod_data_22 = transform(mod_data_2);
  var mod_data_32 = transform(mod_data_3);
  console.log("UPDATING LINES!");
  updateData([
    {
      line_data: orig_data2,
      color: 'blue'
    }, {
      line_data: mod_data_12,
      color: 'red'
    }, {
      line_data: mod_data_22,
      color: 'orange'
    }, {
      line_data: mod_data_32,
      color: 'blue'
    }
  ], xscale, yscale);
}, 2000);

// console.log(xscale(1)) console.log(indices) console.log(zeroes)
// console.log(xscale)