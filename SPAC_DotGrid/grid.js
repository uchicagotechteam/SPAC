console.log("LOADED");

var width = 500;
var height = 500;
var total_dots = 500*500/(25*25);

var grid = d3.select("body")
   .append("svg")
   .attr("width", width)
   .attr("height", height);

for (var j=25; j <= height-25; j+=25) {
	for (var i=25; i <= width-25; i+=25) {
    	grid.append("circle")
    	    .attr("class", "circle")
        	.attr("cx", i)
        	.attr("cy", j)
        	.attr("r", 8)
        	.style("fill", "rgba(0,0,0,0.2)");
	};
};


function colorNDotsAtM (m,n, color) {
 grid.selectAll(".circle").filter(function(d, i) {return (i >= m) && (i < m+n);}).style("fill", color);
}

function colorPercentageNatM (percFilled, percToFill, color) {
  colorNDotsAtM(floor(percFilled*total_dots),floor(percToFill*total_dots),color);
  var percNowFilled = percFilled+percToFill;
  return percNowFilled;
}
