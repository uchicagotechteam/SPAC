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
		var violentLos = losV_ * valVLengthOfStay / 100;
		var nonViolentLos = losNV_ * valNVLengthOfStay / 100;
		var violentInc = addV_ * valVIncomingPrisoners / 100;
		var nonViolentInc = addNV_ * valNVIncomingPrisoners / 100;

		var nvAfter10 = populationStepYears(10, nonViolentInc, nonViolentLos, nvPpl);
		var vAfter10 = populationStepYears(10, violentInc, violentLos, vPpl);
		// console.log("nvAfter10", nvAfter10,"\n vAfter10", vAfter10);
		colorPercentageNatM(0,1,"rgba(0,0,0,0.2)")
		colorPercentageNatM(0,(nvPpl-nvAfter10)/nvPpl,"blue");
		colorPercentageNatM((vPpl-vAfter10)/vPpl,(nvPpl-nvAfter10)/nvPpl,"red");
}

function colorNDotsAtM (m,n, color) {
 grid.selectAll(".circle").filter(function(d, i) {return (i >= m) && (i < m+n);}).style("fill", color);
}

function colorPercentageNatM (percFilled, percToFill, color) {
  colorNDotsAtM(Math.floor(percFilled*total_dots),Math.floor(percToFill*total_dots),color);
  var percNowFilled = percFilled+percToFill;
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

			grid = d3.select("body")
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
