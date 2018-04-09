var valVLengthOfStay = 0;
var valVIncomingPrisoners = 0;
var valNVLengthOfStay = 0;
var valNVIncomingPrisoners = 0;

function update() {
		console.log('Violent lengthOfStay', valVLengthOfStay);
		console.log('Violent Incoming Prisoners', valVIncomingPrisoners);
		console.log('NonViolent lengthOfStay', valNVLengthOfStay);
		console.log('Nonviolent incomingPrisoners', valNVIncomingPrisoners);
}

function createSlider(name) {
		$('#' + name).slider({
				formatter: function (value) {
						return 'Current value: ' + value;
				},
				change: update
		});

}

$(document)
		.ready(function () {
				createSlider('VLengthOfStay');
				createSlider('VIncomingPrisoners');
				createSlider('NVLengthOfStay');
				createSlider('NVIncomingPrisoners');

				var VLengthOfStay = $("#VLengthOfStay")
						.slider()
						.on('slideStop', update);
				var VIncomingPrisoners = $("#VIncomingPrisoners")
						.slider()
						.on('slideStop', update);
				var NVLengthOfStay = $("#NVLengthOfStay")
						.slider()
						.on('slideStop', update);
				var NVIncomingPrisoners = $("#NVIncomingPrisoners")
						.slider()
						.on('slideStop', update);

				valVLengthOfStay = VLengthOfStay.slider('getValue');
				valVIncomingPrisoners = VIncomingPrisoners.slider('getValue');
				valNVLengthOfStay = NVLengthOfStay.slider('getValue');
				valNVIncomingPrisoners = NVLengthOfStay.slider('getValue');
		});
