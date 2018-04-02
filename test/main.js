function createSlider(name) {
	$('#' + name).slider({
		formatter: function (value) {
				return 'Current value: ' + value;
		}
});

}

$(document).ready(function() {
	createSlider('ex1');
	createSlider('ex2');
	createSlider('ex3');
	createSlider('ex4');

	var slider1 = $("#ex1").slider();
	console.log(slider1.slider('getValue'));
	var slider2 = $("#ex2").slider();
	console.log(slider2.slider('getValue'));
	var slider3 = $("#ex3").slider();
	console.log(slider3.slider('getValue'));
	var slider4 = $("#ex4").slider();
	console.log(slider4.slider('getValue'));

	
$('#push').click(function() {
	var slider1 = $("#ex1").slider();
	console.log(slider1.slider('getValue'));
	var slider2 = $("#ex2").slider();
	console.log(slider2.slider('getValue'));
	var slider3 = $("#ex3").slider();
	console.log(slider3.slider('getValue'));
	var slider4 = $("#ex4").slider();
	console.log(slider4.slider('getValue'));
});

});
