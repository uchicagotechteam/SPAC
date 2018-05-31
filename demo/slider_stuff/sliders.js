function createSlider(name) {
  $('#' + name).slider({
      formatter: function (value) {
          return 'Current percentage change: ' + value + '%';
      }
  });

}

4,752
8,803
412
1,527
1,578
1,338
6,905

function adjust (a) {
	if (a > 0) {
		return 1 + a;
	} else {
		return 1 - a;
	}
}

function update () {

	var dvax = 1338;
	var dvay = 1527;
	var dvaz = 1578;
	var dvlx = 9.17;
	var dvly = 2.55;
	var dvlz = .9;

	var dnvax = 412;
	var dnvay = 4752;
	var dnvaz = 8803;
	var dnvlx = 3.63;
	var dnvly = 1.83;
	var dnvlz = .67;

	// var vat = $('#VAdmissionsT').slider('getValue');
	var vax = adjust($('#VAdmissionsX').slider('getValue') / 100);
	var vay = adjust($('#VAdmissionsY').slider('getValue') / 100);
	var vaz = adjust($('#VAdmissionsZ').slider('getValue') / 100);

	// var vlt = adjust($('#VLengthOfStayT').slider('getValue');
	var vlx = adjust($('#VLengthOfStayX').slider('getValue') / 100);
	var vly = adjust($('#VLengthOfStayY').slider('getValue') / 100);
	var vlz = adjust($('#VLengthOfStayZ').slider('getValue') / 100);
	// var nvt = adjust($('#NVAdmissionsT').slider('getValue');
	var nvax = adjust($('#NVAdmissionsX').slider('getValue') / 100);
	var nvay = adjust($('#NVAdmissionsY').slider('getValue') / 100);
	var nvaz = adjust($('#NVAdmissionsZ').slider('getValue') / 100);
	// var nvt = adjust($('#NVLengthOfStayT').slider('getValue');
	var nvlx = adjust($('#NVLengthOfStayX').slider('getValue') / 100);
	var nvly = adjust($('#NVLengthOfStayY').slider('getValue') / 100);
	var nvlz = adjust($('#NVLengthOfStayZ').slider('getValue') / 100);

    var obj = {
        // uncomment and add values once Nate provides them
        'population' :
        {
            'violent' : {
                'x' : 0,
                '12' : 0,
                '34' : 0

            },
            'nonviolent' : {
                'x' : 0,
                '12' : 0,
                '34' : 0
            }
        },
        'original' : {
            'violent' : {
                'x' : {
                    'admissions' : dvax,
                    'los' : dvlx
                },
                '12' : {
                    'admissions' : dvay,
                    'los' : dvly
                },
                '34' : {
                    'admissions': dvaz,
                    'los' : dvlz
                }
            },
            'nonviolent' : {
                'x' : {
                    'admissions' : dnvax,
                    'los' : dnvlx
                },
                '12' : {
                    'admissions' : dnvay,
                    'los' : dnvly
                },
                '34' : {
                    'admissions': dnvaz,
                    'los' : dnvlz
                }
            }
        },
        'updated' : {
    		'violent' : {
                'x' : {
                    'admissions' : vax * dvax,
                    'los' : vlx * dvlx
                },
                '12' : {
                    'admissions' : vay * dvay,
                    'los' : vly * dvly
                },
                '34' : {
                    'admissions': vaz * dvaz,
                    'los' : vlz * dvlz
                }
            },
            'nonviolent' : {
                'x' : {
                    'admissions' : nvax * dnvax,
                    'los' : nvlx * dnvlx
                },
                '12' : {
                    'admissions' : nvay * dnvay,
                    'los' : nvly * dnvly
                },
                '34' : {
                    'admissions': nvaz * dnvaz,
                    'los' : nvlz * dnvlz
                }
            }
        }
	};

    updatePlots(obj);

}

$(document)
		.ready(function () {

				createSlider('VAdmissionsT');
				createSlider('VAdmissionsX');
				createSlider('VAdmissionsY');
				createSlider('VAdmissionsZ');
				createSlider('VLengthOfStayT');
				createSlider('VLengthOfStayX');
				createSlider('VLengthOfStayY');
				createSlider('VLengthOfStayZ');
				createSlider('NVAdmissionsT');
				createSlider('NVAdmissionsX');
				createSlider('NVAdmissionsY');
				createSlider('NVAdmissionsZ');
				createSlider('NVLengthOfStayT');
				createSlider('NVLengthOfStayX');
				createSlider('NVLengthOfStayY');
				createSlider('NVLengthOfStayZ');

				$('#VAdmissionsT').slider().on('slide', function () {
					var toSet = $('#VAdmissionsT').slider('getValue');
					$('#VAdmissionsX').slider('setValue', toSet);
					$('#VAdmissionsY').slider('setValue', toSet);
					$('#VAdmissionsZ').slider('setValue', toSet);
					update();
				});

				$('#VLengthOfStayT').slider().on('slide', function () {
					var toSet = $('#VLengthOfStayT').slider('getValue');
					$('#VLengthOfStayX').slider('setValue', toSet);
					$('#VLengthOfStayY').slider('setValue', toSet);
					$('#VLengthOfStayZ').slider('setValue', toSet);
					update();
				});

				$('#NVAdmissionsT').slider().on('slide', function () {
					var toSet = $('#NVAdmissionsT').slider('getValue');
					$('#NVAdmissionsX').slider('setValue', toSet);
					$('#NVAdmissionsY').slider('setValue', toSet);
					$('#NVAdmissionsZ').slider('setValue', toSet);
					update();
				});

				$('#NVLengthOfStayT').slider().on('slide', function () {
					var toSet = $('#NVLengthOfStayT').slider('getValue');
					$('#NVLengthOfStayX').slider('setValue', toSet);
					$('#NVLengthOfStayY').slider('setValue', toSet);
					$('#NVLengthOfStayZ').slider('setValue', toSet);
					update();
				});

                $('#VAdmissionsX').slider().on('slide', function () {
                    update();
                });

                $('#VAdmissionsY').slider().on('slide', function () {
                    update();
                });

                $('#VAdmissionsZ').slider().on('slide', function () {
                    update();
                });

                $('#VLengthOfStayX').slider().on('slide', function () {
                    update();
                });

                $('#VLengthOfStayY').slider().on('slide', function () {
                    update();
                });

                $('#VLengthOfStayZ').slider().on('slide', function () {
                    update();
                });

                $('#NVAdmissionsX').slider().on('slide', function () {
                    update();
                });

                $('#NVAdmissionsY').slider().on('slide', function () {
                    update();
                });

                $('#NVAdmissionsZ').slider().on('slide', function () {
                    update();
                });

                $('#NVLengthOfStayX').slider().on('slide', function () {
                    update();
                });

                $('#NVLengthOfStayY').slider().on('slide', function () {
                    update();
                });

                $('#NVLengthOfStayZ').slider().on('slide', function () {
                    update();
                });

				// $('#NVAdmissionsT').slider().on('slide', function () {
				// 	var toSet = $('#NVAdmissionsT').slider('getValue');
				// 	$('#NVAdmissionsX').slider('setValue', toSet);
				// 	$('#NVAdmissionsY').slider('setValue', toSet);
				// 	$('#NVAdmissionsZ').slider('setValue', toSet);
				// 	console.log("UPDATED");
				// });
				// VLengthOfStay = $("#VLengthOfStay")
				// 		.slider()
				// 		.on('slide', update);
				// VIncomingPrisoners = $("#VIncomingPrisoners")
				// 		.slider()
				// 		.on('slide', update);
        //     VLengthOfStay = $("#VLengthOfStay2")
				// 		.slider()
				// 		.on('slide', update);
        //     VIncomingPrisoners = $("#VIncomingPrisoners2")
				// 		.slider()
				// 		.on('slide', update);
        //     VIncomingPrisoners = $("#VAdmissionsT")
				// 		.slider()
				// 		.on('slide', update);
				// NVLengthOfStay = $("#NVLengthOfStay")
				// 		.slider()
				// 		.on('slide', update);
				// NVIncomingPrisoners = $("#NVIncomingPrisoners")
				// 		.slider()
				// 		.on('slide', update);

				// valVLengthOfStay = VLengthOfStay.slider('getValue');
				// valVIncomingPrisoners = VIncomingPrisoners.slider('getValue');
				// valNVLengthOfStay = NVLengthOfStay.slider('getValue');
				// valNVIncomingPrisoners = NVIncomingPrisoners.slider('getValue');

				// v1 = $('#v1');
				// v2 = $('#v2');
				// v3 = $('#v3');
				// v4 = $('#v4');
				// update();
				update();
		});
