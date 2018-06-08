function createSlider(name) {
  $('#' + name).slider({
      formatter: function (value) {
          return 'Current percentage change: ' + value + '%';
      }
  });
}

function adjust (a) {
    return 1+a;
}

function update () {
    // violent original admission rate
	var dvax = 1338;
	var dvay = 1527;
	var dvaz = 1578;
    // violent original length of stay
	var dvlx = 9.17;
	var dvly = 2.55;
	var dvlz = .9;
    // violent initial population sizes
    var dvix = 16686;
    var dviy = 4408;
    var dviz = 1418;
    // non-violent original admission rate
	var dnvax = 412;
	var dnvay = 4752;
	var dnvaz = 8803;
    // non-violent original length of stay
	var dnvlx = 3.63;
	var dnvly = 1.83;
	var dnvlz = .67;
    // non-violent initial population sizes
    var dnvix = 1777;
    var dnviy = 8496;
    var dnviz = 5567;


	var vax = adjust($('#VAdmissionsX').slider('getValue') / 100);
	var vay = adjust($('#VAdmissionsY').slider('getValue') / 100);
	var vaz = adjust($('#VAdmissionsZ').slider('getValue') / 100);

	var vlx = adjust($('#VLengthOfStayX').slider('getValue') / 100);
	var vly = adjust($('#VLengthOfStayY').slider('getValue') / 100);
	var vlz = adjust($('#VLengthOfStayZ').slider('getValue') / 100);
	var nvax = adjust($('#NVAdmissionsX').slider('getValue') / 100);
	var nvay = adjust($('#NVAdmissionsY').slider('getValue') / 100);
	var nvaz = adjust($('#NVAdmissionsZ').slider('getValue') / 100);
	var nvlx = adjust($('#NVLengthOfStayX').slider('getValue') / 100);
	var nvly = adjust($('#NVLengthOfStayY').slider('getValue') / 100);
	var nvlz = adjust($('#NVLengthOfStayZ').slider('getValue') / 100);

    var obj = {
        'population' :
        {
            'violent' : {
                'x' : dvix,
                '12' : dviy,
                '34' : dviz

            },
            'nonviolent' : {
                'x' : dnvix,
                '12' : dnviy,
                '34' : dnviz
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

				update();
		});
