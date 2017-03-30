function Utils() {}

Utils.getQueryVariable = function(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
		  return pair[1];
		}
	}
};

Utils.setRomanianTime = function() {
	$("#time-left")
		.countdown("2017/04/29 14:00:00", function(event) {
			 $(this).text(
			   event.strftime('%D zile %H:%M:%S')
			 );
		}
	);
};

Utils.setEnglishTime = function() {
	$("#time-left")
		.countdown("2017/04/29 14:00:00", function(event) {
			 $(this).text(
			   event.strftime('%D days %H:%M:%S')
			 );
		}
	);
};

Utils.setGermanTime = function() {
	$("#time-left")
		.countdown("2017/04/29 14:00:00", function(event) {
			 $(this).text(
			   event.strftime('%D Tage %H:%M:%S')
			 );
		}
	);
};