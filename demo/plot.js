/* implementation heavily influenced by http://bl.ocks.org/1166403 */

// define dimensions of graphLegend
var leg_total_w = 265;
var leg_total_h = 180;
var leg_m = [20, 20, 20, 20]; // margins
var leg_w = leg_total_w - leg_m[1] - leg_m[3]; // width
var leg_h = leg_total_h - leg_m[0] - leg_m[2]; // height

// define dimensions of graph
var plot_w = 800;
var total_w = plot_w + (leg_total_w - 80) * 2;
var total_h = 420;
var m = [10, 80 + leg_total_w, 50, 80 + leg_total_w]; // margins
var w = plot_w + 2*leg_total_w - m[1] - m[3]; // width
var h = total_h - m[0] - m[2]; // height

// list of colors used
var colors_list = ["blue", "red", "orange"];

var point;

// prerequisite: n should be less than 6 digits long
function formatNumber(n) {
    var res = Math.round(n).toString();
    var l = res.length;
    if (l > 3 && l < 7) {
        return res.substring(0,l-3) + "," + res.substring(l-3,l);
    }
    else {
        return res;
    }
}

// X scale will fit all values from data[] within pixels 0-w
var x = d3
  .scaleLinear()
  .domain([0, numYears + 1])
  .range([0, w]);
// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain
// for the y-scale: bigger is up!) var y = d3.scale.linear().domain([0,
// 10]).range([h, 0]); automatically determining max range can work something
// like this
var y = d3
  .scaleLinear()
  .domain([0, ymax])
  .range([h, 0]);

// create a line function that can convert data[] into x and y points
var line = d3
  .line()
  // assign the X function to plot our line as we wish
  .x(function (d, i) {
    // return the X coordinate where we want to plot this datapoint
    return x(i);
  })
  .y(function (d) {
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
  .ticks(10)
// Add the y-axis to the left
graph
  .append("svg:g")
  .attr("class", "y axis")
  .attr("transform", "translate(-25,0)")
  .call(yAxisLeft);


// Add descriptions for the axes
graph   // y-axis description
    .append("text")
    .attr("x", -200)
    .attr("y", h / 2)
    .attr("font-size", "14px")
    .attr("font-family", "Open Sans")
    .attr("stroke", "black")
    .attr("stroke-width", 0.8)
    .attr("transform", "rotate(-90 -110 160)")
    .text("Prison Population Size");
graph   // x-axis description
    .append("text")
    .attr("x", w / 2 - 100)
    .attr("y", h + 35)
    .attr("font-size", "14px")
    .attr("font-family", "Open Sans")
    .attr("stroke", "black")
    .attr("stroke-width", 0.8)
    .text("Number of Years From Now");


// Add legend to graph
var legend_x = w + leg_m[1];
var legend_y = (h-leg_h) * (0.9);

var legend = graph
    .append("svg:g")
    .attr("class", "graphLegend");

legend
    .append("rect")
    .attr("x", legend_x)
    .attr("y", legend_y)
    .attr("width", leg_w)
    .attr("height", leg_h)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1);

function addLegendRow(label, index, col=null, width=null) {
    legend
        .append("text")
        .attr("x", legend_x + 10)
        .attr("y", legend_y + 20 + index*20)
        .attr("font-size", "12px")
        .attr("font-family", "Open Sans")
        .attr("stroke", col == null ? colors_list[index] : col)
        .attr("stroke-width", width=null ? 0.8 : width)
        // .attr("fill", colors_list[0])
        .text(label);
}

addLegendRow("Population with Current Parameters", 0);
addLegendRow("Change Due to Violent Crimes", 1);
addLegendRow("Change Due to Non-Violent Crimes", 2);
addLegendRow("Note that the Non-Violent line shows", 3.5, "gray", width=0.4);
addLegendRow("the total population with all", 4.5, "gray", width=0.4);
addLegendRow("the modified parameters together.", 5.5, "gray", width=0.4);


var indices = d3.range(numYears + 1)
var zeroes = []
var ones = []
for (var i = 0; i < numYears + 1; i++) {
  zeroes.push(0)
  ones.push(ymax)
}

function updateData(lines2, xscale, yscale) {

  plotLines(lines2, xscale, yscale);

  graph
    .selectAll('.line')
    .data(lines2)
    // .update()
    .transition()
    .attr("d", function (d) {
      return line(d.line_data);
    })
    .attr("fill", "none")
    .attr("stroke", function (d) {
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
      for (let j = 0; j < lines[0].line_data.length; j++) {
        next.push([
          lines[i].line_data[j],
          lines[i + 1].line_data[j]
        ]);
      }
      to_return.push({
        color: lines[i+1].color,
        area_data: next
      });
    }
    return to_return;
  }

  var nextGraph = graph
    .selectAll('.area')
    .data(pairLines(lines2));

  nextGraph
    .transition()
    .attr('class', 'area')
    .attr('opacity', 0.5)
    .attr('fill', function (d) {
      return d.color;
    })
    .attr("d", function (d) {
      return area(d.area_data);
    })

  var expandLines = function (lines2) {
    a = []
    lines2.forEach(function (lin) {
      lin.line_data.forEach(function (y, ind) {
        a.push({
          color: lin.color,
          x: ind,
          y: y
        });
      })
    });
    return a;
  };

  point = graph.selectAll('.point')
    .data(expandLines(lines2))

  var things = point.enter()
    .append("g")
    .attr("class", "point")


  things.append("circle").attr("cx", function (d) {
      return xscale(d.x);
    })
    .attr("cy", function (d) {
      return h - yscale(d.y);
    })
    .attr("r", 4)
    .attr("fill", function (d) {
      return d.color;
    })
    .attr("x", function(d) {
        return d.x;
    })
    .attr("y", function(d) {
        return d.y;
    });

  things.append("text").attr("font-family", "sans-serif")
    .attr("font-size", "12px").attr("x", function (d) {
      return xscale(d.x);
    }).attr("y", function (d) {
      return h - yscale(d.y);
    })
    .attr("fill", function (d) {
      return "black";
    });

  point.select('circle').transition()
    .attr("cx", function (d) {
      return xscale(d.x);
    })
    .attr("cy", function (d) {
      return h - yscale(d.y);
    })
    .attr("r", 4)
    .attr("fill", function (d) {
      return d.color;
    })
    .attr("x", function(d) {
        return d.x;
    })
    .attr("y", function(d) {
        return d.y;
    });

  point.select('text')
    .attr("font-size", "12px").attr("x", function (d) {
      return xscale(d.x) - 5;
    }).attr("y", function (d) {
      return h - yscale(d.y) - 10;
    })
    .attr("fill", function (d) {
      return d.color;
    });


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
      for (let j = 0; j < lines[0].line_data.length; j++) {
        next.push([
          lines[i].line_data[j],
          lines[i + 1].line_data[j]
        ]);
      }
      to_return.push({
        color: lines[i].color,
        area_data: next
      });
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
      return d.color;
    })
    .attr("d", function (d) {
      return area(d.area_data);
    })

  var expandLines = function (lines) {
    a = []
    lines.forEach(function (line) {
      line.line_data.forEach(function (y, ind) {
        a.push({
          color: line.color,
          x: ind,
          y: y
        });
      })
    })
    return a;
  };
  point = graph.selectAll('.point')
    .data(expandLines(lines))
    .enter()
    .append("g")
    .attr("class", "point")

  point.append("circle").attr("cx", function (d) {
      return xscale(d.x);
    })
    .attr("cy", function (d) {
      return h - yscale(d.y);
    })
    .attr("r", 4)
    .attr("fill", function (d) {
      return d.color;
    })
    .attr("x", function(d) {
        return d.x;
    })
    .attr("y", function(d) {
        return d.y;
    });

  point.append("text").attr("font-family", "sans-serif")
    .attr("font-size", "12px").attr("class","point_label").attr("x", function (d) {
      return xscale(d.x);
    }).attr("y", function (d) {
      return h - yscale(d.y);
    })
    .attr("fill", function (d) {
      return "black";
    });


  point.on("click", function (d) {
    var current = d3.select(this);
    var circ = current.select("circle");
    var textbox = current.select("text");
    var op = (circ.attr("opacity") == 0.2) ? 1.0 : 0.2;
    var label = (circ.attr("opacity") == 0.2) ? "" : ("After " + circ.attr("x") + " yrs: " + formatNumber(circ.attr("y")));
    graph.selectAll('.point_label').text("");
    graph.selectAll('.point').select("circle").attr("opacity",1.0);
    circ.attr("opacity", op);
    textbox.text(label);
  })

}

var xscale = d3
  .scaleLinear()
  .range([
    0, w / (numYears + 1)
  ])
  .domain(indices);

var yscale = d3
  .scaleLinear()
  .range([0, h])
  .domain([0, ymax]);
