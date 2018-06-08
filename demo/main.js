// GLOBAL PARAMETERS
var numYears = 10;
var ymax = 60000;

var ease = d3.easeBounce;

function addLists(lists) {
	var to_return = [];
	var n = lists.length;
	for (let i = 0; i < lists[0].length; i++) {
		var sum = 0;
		for (let j = 0; j < n; j++) {
			sum = sum + lists[j][i];
		}
		to_return.push(sum);
	}
	return to_return;
}

function generateData(ppl, inc, los, numYears) {
	var pop = ppl;
	var data = [];
	data.push(pop);
	for (var i = 0; i < numYears; i++) {
			pop = populationStep(pop, inc, los);
			data.push(pop);
		}
	return data;
}

function updatePlots(params) {

	var upV_X = generateData(params['population']['violent']['x'],
					params['updated']['violent']['x']['admissions'],
					params['updated']['violent']['x']['los'], numYears);

	var upV_12 = generateData(params['population']['violent']['12'],
	 				params['updated']['violent']['12']['admissions'],
				 	params['updated']['violent']['12']['los'], numYears);

	var upV_34 = generateData(params['population']['violent']['34'],
				 	params['updated']['violent']['34']['admissions'],
				 	params['updated']['violent']['34']['los'], numYears);

	var upNV_X = generateData(params['population']['nonviolent']['x'],
					params['updated']['nonviolent']['x']['admissions'],
					params['updated']['nonviolent']['x']['los'], numYears);

	var upNV_12 = generateData(params['population']['nonviolent']['12'],
				 	params['updated']['nonviolent']['12']['admissions'],
				 	params['updated']['nonviolent']['12']['los'], numYears);

	var upNV_34 = generateData(params['population']['nonviolent']['34'],
				 	params['updated']['nonviolent']['34']['admissions'],
				 	params['updated']['nonviolent']['34']['los'], numYears);


	var orgV_X = generateData(params['population']['violent']['x'],
					params['original']['violent']['x']['admissions'],
					params['original']['violent']['x']['los'], numYears);

	var orgV_12 = generateData(params['population']['violent']['12'],
				 	params['original']['violent']['12']['admissions'],
				 	params['original']['violent']['12']['los'], numYears);

	var orgV_34 = generateData(params['population']['violent']['34'],
				 	params['original']['violent']['34']['admissions'],
				 	params['original']['violent']['34']['los'], numYears);

	var orgNV_X = generateData(params['population']['nonviolent']['x'],
					params['original']['nonviolent']['x']['admissions'],
					params['original']['nonviolent']['x']['los'], numYears);

	var orgNV_12 = generateData(params['population']['nonviolent']['12'],
				 	params['original']['nonviolent']['12']['admissions'],
				 	params['original']['nonviolent']['12']['los'], numYears);

	var orgNV_34 = generateData(params['population']['nonviolent']['34'],
				 	params['original']['nonviolent']['34']['admissions'],
				 	params['original']['nonviolent']['34']['los'], numYears);


	var upV = addLists([upV_X, upV_12, upV_34]);
	var upNV = addLists([upNV_X, upNV_12, upNV_34]);
	var orgV = addLists([orgV_X, orgV_12, orgV_34]);
	var orgNV = addLists([orgNV_X, orgNV_12, orgNV_34]);

	var data1 = addLists([orgV, orgNV]);
	var data2 = addLists([orgNV, upV]);
	var data3 = addLists([upV, upNV]);

	/* updateData function in plot.js */
	updateData(
		[	  {
				line_data: data1,
				color: colors_list[0]
			  }, {
				line_data: data2,
				color: colors_list[1]
			  }, {
				line_data: data3,
				color: colors_list[2]
			  }], xscale, yscale
	);
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
