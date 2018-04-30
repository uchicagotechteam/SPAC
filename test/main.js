var valVLengthOfStay = 0;
var valVIncomingPrisoners = 0;
var valNVLengthOfStay = 0;
var valNVIncomingPrisoners = 0;

var capacity_ = 100000;
var initialPopV_ = 43075 / 2.0;
var initialPopNV_ = 43075 / 2.0;
var losV_ = 1.9;
var losNV_ = 1.9;
var addV_ = 26692 / 2;
var addNV_ = 26692 / 2;

var VLengthOfStay;
var VIncomingPrisoners;
var NVLengthOfStay;
var NVIncomingPrisoners;

var v1;
var v2;
var v3;
var v4;

var width = 500;
var height = 500;
var total_dots = 500*500/(25*25);

var grid;

var ease = d3.easeBounce;

// Original intended capacity = 32,000
// Current operational capacity with modifications =  54,500
// In 2014, there were 54,000 people
var current_op_cap = 54500;

function update() {
		valVLengthOfStay = VLengthOfStay.slider('getValue');
		valVIncomingPrisoners = VIncomingPrisoners.slider('getValue');
		valNVLengthOfStay = NVLengthOfStay.slider('getValue');
		valNVIncomingPrisoners = NVLengthOfStay.slider('getValue');
		console.log('Violent lengthOfStay', valVLengthOfStay);
		console.log('Violent Incoming Prisoners', valVIncomingPrisoners);
		console.log('NonViolent lengthOfStay', valNVLengthOfStay);
		console.log('Nonviolent incomingPrisoners', valNVIncomingPrisoners);
		v1.html(valVLengthOfStay);
		v2.html(valVIncomingPrisoners);
		v3.html(valNVLengthOfStay);
		v4.html(valNVIncomingPrisoners);

		var vPpl = initialPopV_;
		var nvPpl =  initialPopNV_;
		var totalPop = vPpl + nvPpl;
		var violentLos = losV_ * valVLengthOfStay / 100;
		var nonViolentLos = losNV_ * valNVLengthOfStay / 100;
		var violentInc = addV_ * valVIncomingPrisoners / 100;
		var nonViolentInc = addNV_ * valNVIncomingPrisoners / 100;

		var nvAfter10 = vPpl - populationStepYears(10, nonViolentInc, nonViolentLos, nvPpl);
		var vAfter10 = nvPpl - populationStepYears(10, violentInc, violentLos, vPpl);
		var totalPopPerc = totalPop/current_op_cap;
		var nvPerc = ((nvAfter10-nvPpl)/current_op_cap);
		var vPerc = ((vAfter10-vPpl)/current_op_cap);

		colorPercentageNatM(0,1,"rgba(0,0,0,0.2)");
		
		colorPercentageNatM(1-totalPopPerc,1,"rgba(150,200,200,1)");
		var percFilled = totalPopPerc;

		if (nvPerc >= 0) {
			colorPercentageNatM(1-(percFilled+nvPerc),1-percFilled,"blue");
			percFilled = percFilled+nvPerc;
		} else {
			colorPercentageNatM(1-percFilled,(1-(percFilled+nvPerc)),"blue");
			percFilled = percFilled+nvPerc;
		}

		if (vPerc >= 0) {
			colorPercentageNatM(1-(percFilled+vPerc),1-percFilled,"red");
			percFilled = percFilled+vPerc;
		} else {
			colorPercentageNatM(1-percFilled,1-(percFilled+vPerc),"red");
			percFilled = percFilled+vPerc;
		}

}

function colorDotsFromNToM (m,n, color) {
 grid.selectAll(".circle").filter(function(d, i) {return ((i >= m) && (i < n));}).style("fill", color);
}

function colorPercentageNatM (percFilled, percToFillTo, color) {

  if (percFilled > 1) {percFilled = 1;}
	if (percFilled < 0) {percToFillTo = 0;}

	if (percToFillTo > 1) {percToFillTo = 1;}
	if (percToFillTo < 0) {percToFillTo = 0;}

  colorDotsFromNToM(Math.floor(percFilled*total_dots),Math.floor(percToFillTo*total_dots),color);
  var percNowFilled = percFilled+percToFillTo;
  return percNowFilled;
}

function createSlider(name) {
		$('#' + name).slider({
				formatter: function (value) {
						return 'Current value: ' + value;
				}
		});

}

// add 26692 lost 1.9 current prision Pop 43,075

function populationStepYears(years, add, avgLos, start) {
		var pop = start;
		for (var i = 0; i < years; i++) {
				pop = populationStep(pop, add, avgLos);
		}
		return pop;
}

function populationStep(prevPop, add, avgLos) {
		var expon = Math.exp(-1.0 / avgLos);
		return add * avgLos * (1.0 - expon) + prevPop * expon;
}



$(document)
		.ready(function () {

			grid = d3.select(".grid")
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
								.style("fill", "rgba(0,0,0,0.2)")
								.transition()
								  .duration(0)
									.on("end", function(){
										grid.selectAll(".circle")
										.on
										.filter(function(d,k){i==3})
										.transition()
										.delay(0)
										.duration(10)
										.attr("cx",1000)
										.ease(ease); // second ease
									});
				};
			};


				createSlider('VLengthOfStay');
				createSlider('VIncomingPrisoners');
				createSlider('NVLengthOfStay');
				createSlider('NVIncomingPrisoners');

				VLengthOfStay = $("#VLengthOfStay")
						.slider()
						.on('slideStop', update);
				VIncomingPrisoners = $("#VIncomingPrisoners")
						.slider()
						.on('slideStop', update);
				NVLengthOfStay = $("#NVLengthOfStay")
						.slider()
						.on('slideStop', update);
				NVIncomingPrisoners = $("#NVIncomingPrisoners")
						.slider()
						.on('slideStop', update);

				valVLengthOfStay = VLengthOfStay.slider('getValue');
				valVIncomingPrisoners = VIncomingPrisoners.slider('getValue');
				valNVLengthOfStay = NVLengthOfStay.slider('getValue');
				valNVIncomingPrisoners = NVLengthOfStay.slider('getValue');

				v1 = $('#v1');
				v2 = $('#v2');
				v3 = $('#v3');
				v4 = $('#v4');
				update();


			});
