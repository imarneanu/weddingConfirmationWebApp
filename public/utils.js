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

Utils.getTodayDate = function () {
	var today = new Date();
	var hh = today.getHours();
	var min = today.getMinutes();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (hh < 10) {
		hh = '0' + hh;
	}

	if (min < 10) {
		min = '0' + min;
	}

	if (dd < 10) {
	    dd = '0' + dd;
	} 

	if (mm < 10) {
	    mm = '0'+ mm;
	} 

	return dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + min;
};

Utils.setConfirmationDialog = function(isDevDialog) {
	var modal = document.getElementById('confirmation-dialog');
	if (isDevDialog) {
		modal = document.getElementById('dev-confirmation-dialog');
	}

	var btn = document.getElementById("confirmation-btn");
	btn.onclick = function() {
	    modal.style.display = "block";
	}

	var closeIndex = 0;
	if (isDevDialog) {
		closeIndex = 1;
	}
	var span = document.getElementsByClassName("close")[closeIndex];
	span.onclick = function() {
	    modal.style.display = "none";
	}

	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
};

Utils.hideConfirmationDialog = function(isDevDialog) {
	var modal = document.getElementById('confirmation-dialog');
	if (isDevDialog) {
		modal = document.getElementById('dev-confirmation-dialog');
	}
	modal.style.display = "none";
};

Utils.showInput = function(input, checkbox) {
	if (checkbox.checked) {
		input.style.display = "block";
		return;
	}
	input.style.display = "none";
};

Utils.toggleValue = function(value) {
	if (value == 'false') 
		return 'true'; 
	return 'false';
}