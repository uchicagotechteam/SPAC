console.log("LOADED");

var width = 500;
var height = 500;

var grid = d3.select("body")
   .append("svg")
   .attr("width", width)    
   .attr("height", height);



for (var i=25; i <= width-25; i=i+25) {
	for (var j=25; j <= height-25; j=j+25) {
    	grid.append("circle")
    	    .attr("class", "circle")
        	.attr("cx", i)
        	.attr("cy", j)
        	.attr("r", 5)
        	.style("fill", "black");
	};
};



 grid.selectAll(".circle").style("fill", "red");