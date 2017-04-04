function Notification() {}

Notification.sendPageAccessed = function(guestId) {
	var url = "https://iuliaalexwedding.firebaseio.com/token.json";
	var method = "GET";
	var async = true;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState == XMLHttpRequest.DONE) {
  			Notification.sendPageAccessedNotification(JSON.parse(request.responseText).token, guestId);
	    }
	}
	request.open(method, url, async);
	request.send(null);
};

Notification.sendPageAccessedNotification = function(token, guestId) {
	var today = Utils.getTodayDate();
	var postData = "{\"to\":\"" + token + "\",\"data\":{\"guest\":\"" + guestId + "\", \"timestamp\":\"" + today + "\"}}";

	Notification.sendNotification(postData);
};

Notification.sendConfirmation = function(language, attend, devInput) {
	if (!Notification.isConfirmationDataValid(language, attend, devInput)) {
		return;
	}

	var url = "https://iuliaalexwedding.firebaseio.com/token.json";
	var method = "GET";
	var async = true;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState == XMLHttpRequest.DONE) {
	    	if (attend) {
	    		if (devInput) {
	    			Notification.sendDevConfirmationNotification(JSON.parse(request.responseText).token);
	    			return;
	    		}
  				Notification.sendConfirmationNotification(JSON.parse(request.responseText).token);
  				return;
  			}
  			Notification.sendNoConfirmationNotification(JSON.parse(request.responseText).token, devInput);
	    }
	}
	request.open(method, url, async);
	request.send(null);
};

Notification.isConfirmationDataValid = function(language, attend, devInput) {
	var guestName = document.getElementById('guest-name').value;
	if (devInput) {
		guestName = document.getElementById('dev-guest-name').value;
	}
	if (guestName == "") {
		switch (language) {
			case 0:
				alert("Please input your name!");
				break;
			case 1:
				alert("Bitte Vollname hiinzufügen!");
				break;
			default:
				alert("Vă rugăm să vă introduceți numele!");

		}
		return false;
	}

	if (!attend || devInput) {
		return true;
	}
	
	if (document.getElementById('confirmation-partner-checkbox').checked
		&& document.getElementById('partner-name').value == "") {
		switch (language) {
			case 0:
				alert("Please input the partner name!");
				break;
			case 1:
				alert("Bitte der Partener's Vollname hinzufügen!");
				break;
			default:
				alert("Vă rugăm să introduceți numele invitatului!");

		}
		return false;
	}

	if (document.getElementById('confirmation-accommodation-checkbox').checked
		&& document.getElementById('accommodation-start').value == ""
		&& document.getElementById('accommodation-end').value == "") {
		switch (language) {
			case 0:
				alert("Please input the accommodation dates!");
				break;
			case 1:
				alert("Bitte der Übernachtungen Daten hinzufügen!");
				break;
			default:
				alert("Vă rugăm să introduceți nopțile pentru care aveți nevoie de cazare!");

		}
		return false;
	}

	return true;
};

Notification.sendNoConfirmationNotification = function(token, devInput) {
	var guestId = Utils.getQueryVariable("guest");
	var guestName = document.getElementById('guest-name').value;
	if (devInput) {
		guestName = document.getElementById('dev-guest-name').value;
	}

	var today = Utils.getTodayDate();
	var postData = "{\"to\":\"" + token + "\",\"data\":{\"guest\":\"" + guestId + "\", \"guestName\":\"" + guestName + "\", \"attend\":" + false + ", \"timestamp\":\"" + today + "\"}}";

	Notification.sendNotification(postData);
	Utils.hideConfirmationDialog();
};

Notification.sendConfirmationNotification = function(token) {
	var guestId = Utils.getQueryVariable("guest");
	var guestName = document.getElementById('guest-name').value;
	var plusOneName = "";
	if (document.getElementById('confirmation-spouse').style.display == "block") {
		plusOneName = document.getElementById('spouse-name').value;
	} else if (document.getElementById('confirmation-partner-checkbox').checked) {
		plusOneName = document.getElementById('partner-name').value;
	}
	var accommodationStart = "", accommodationEnd = "";
	if (document.getElementById('confirmation-accommodation-checkbox').checked) {
	 	accommodationStart = document.getElementById('accommodation-start').value;
		accommodationEnd = document.getElementById('accommodation-end').value;
	}
	var confirmChurch = document.getElementById('confirm-church-checkbox').checked;
	var confirmOnlyChurch = document.getElementById('confirm-only-church-checkbox').checked;
	var comment = document.getElementById('comment').value;

	var today = Utils.getTodayDate();
	var guestData = "{\"guest\":\"" + guestId + "\", \"guestName\":\"" + guestName + "\", \"attend\":" + true + ", \"attendChurch\":" 
		+ confirmChurch + ", \"attendOnlyChurch\":" + confirmOnlyChurch + ", \"plusOneName\":\"" + plusOneName + "\", \"accommodationStartDate\":\"" + accommodationStart 
		+ "\", \"accommodationEndDate\":\"" + accommodationEnd + "\", \"comment\":\"" + comment + "\", \"timestamp\":\"" + today + "\"}";
	var postData = "{\"to\":\"" + token + "\",\"data\":" + guestData + "}";

	Notification.saveConfirmation(guestData);
	Notification.sendNotification(postData);
	Utils.hideConfirmationDialog(false);
};

Notification.sendDevConfirmationNotification = function(token) {
	var guestId = Utils.getQueryVariable("guest");
	var guestName = document.getElementById('dev-guest-name').value;
	var plusOneName = document.getElementById('dev-partner-name').value;
	var accommodationStart = document.getElementById('dev-accommodation-start').value;
	var accommodationEnd = document.getElementById('dev-accommodation-end').value;
	var confirmChurch = document.getElementById('dev-confirm-church').value;
	var confirmOnlyChurch = document.getElementById('dev-confirm-only-church').value;
	var comment = document.getElementById('dev-comment').value;

	var today = Utils.getTodayDate();
	var guestData = "{\"guest\":\"" + guestId + "\", \"guestName\":\"" + guestName + "\", \"attend\":" + true + ", \"attendChurch\":" 
		+ confirmChurch + ", \"attendOnlyChurch\":" + confirmOnlyChurch + ", \"plusOneName\":\"" + plusOneName + "\", \"accommodationStartDate\":\"" + accommodationStart 
		+ "\", \"accommodationEndDate\":\"" + accommodationEnd + "\", \"comment\":\"" + comment + "\", \"timestamp\":\"" + today + "\"}";
	var postData = "{\"to\":\"" + token + "\",\"data\":" + guestData + "}";

	Notification.saveConfirmation(guestData);
	Notification.sendNotification(postData);
	Utils.hideConfirmationDialog(true);
};

Notification.sendNotification = function(postData) {
	var url = "https://fcm.googleapis.com/fcm/send";
	var method = "POST";

	var async = true;
	var request = new XMLHttpRequest();

	request.onload = function () {
	    var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
		var data = request.responseText; // Returned data, e.g., an HTML document.
	}

	request.open(method, url, async);

	request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("Authorization", "key=AAAAqZqRnA0:APA91bGTTmNyjxL2yK8k8r4JTSa4jcVWFTDnZZEjW8WzFnCIbRYb9U30lHFHdZzyQgk_AuknDbj2DKS6SFzo5qP0FX9F3Xb05YXf_Y1Y2l7R8zHGkAJ5he-CyopJ2XIW2m71OSJtmEHk");
	request.send(postData);
};

Notification.saveConfirmation = function(postData) {
	var url = "https://iuliaalexwedding.firebaseio.com/guest.json";
	var method = "POST";

	var async = true;
	var request = new XMLHttpRequest();

	request.onload = function () {
	    var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
		var data = request.responseText; // Returned data, e.g., an HTML document.
	}

	request.open(method, url, async);

	request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("Authorization", "key=AAAAqZqRnA0:APA91bGTTmNyjxL2yK8k8r4JTSa4jcVWFTDnZZEjW8WzFnCIbRYb9U30lHFHdZzyQgk_AuknDbj2DKS6SFzo5qP0FX9F3Xb05YXf_Y1Y2l7R8zHGkAJ5he-CyopJ2XIW2m71OSJtmEHk");
	request.send(postData);
};