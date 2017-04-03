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

Notification.sendConfirmation = function(language, attend) {
	if (!Notification.isConfirmationDataValid(language, attend)) {
		return;
	}

	var url = "https://iuliaalexwedding.firebaseio.com/token.json";
	var method = "GET";
	var async = true;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState == XMLHttpRequest.DONE) {
	    	if (attend) {
  				Notification.sendConfirmationNotification(JSON.parse(request.responseText).token);
  				return;
  			}
  			Notification.sendNoConfirmationNotification(JSON.parse(request.responseText).token);
	    }
	}
	request.open(method, url, async);
	request.send(null);
};

Notification.isConfirmationDataValid = function(language, attend) {
	if (document.getElementById('guest-name').value == "") {
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

	if (!attend) {
		return true;
	}

	if (document.getElementById('confirmation-partner').style['display'] != "none"
		&& document.getElementById('confirmation-partner').style['display'] != ""
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

	if (document.getElementById('confirmation-accommodation-period').style['display'] != "none"
		&& document.getElementById('confirmation-accommodation-period').style['display'] != ""
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

Notification.sendNoConfirmationNotification = function(token) {
	var guestId = Utils.getQueryVariable("guest");
	var guestName = document.getElementById('guest-name').value;

	var today = Utils.getTodayDate();
	var postData = "{\"to\":\"" + token + "\",\"data\":{\"guest\":\"" + guestId + "\", \"guestName\":\"" + guestName + "\", \"attend\":" + false + ", \"timestamp\":\"" + today + "\"}}";

	Notification.sendNotification(postData);
	Utils.hideConfirmationDialog();
};

Notification.sendConfirmationNotification = function(token) {
	var guestId = Utils.getQueryVariable("guest");
	var guestName = document.getElementById('guest-name').value;
	var spouseName = document.getElementById('spouse-name').value;
	var plusOneName = spouseName;
	var partnerName = document.getElementById('partner-name').value;
	if (spouseName == "") {
		plusOneName = partnerName;
	}
	var accommodationStart = document.getElementById('accommodation-start').value;
	var accommodationEnd = document.getElementById('accommodation-end').value;
	var confirmChurch = document.getElementById('confirm-church').checked;
	var confirmOnlyChurch = document.getElementById('confirm-only-church').checked;
	var comment = document.getElementById('comment').value;

	var today = Utils.getTodayDate();
	var guestData = "{\"guest\":\"" + guestId + "\", \"guestName\":\"" + guestName + "\", \"attend\":" + true + ", \"attendChurch\":" 
		+ confirmChurch + ", \"attendOnlyChurch\":" + confirmOnlyChurch + ", \"plusOneName\":\"" + plusOneName + "\", \"accommodationStartDate\":\"" + accommodationStart 
		+ "\", \"accommodationEndDate\":\"" + accommodationEnd + "\", \"comment\":\"" + comment + "\", \"timestamp\":\"" + today + "\"}";
	var postData = "{\"to\":\"" + token + "\",\"data\":" + guestData + "}";

	Notification.saveConfirmation(guestData);
	Notification.sendNotification(postData);
	Utils.hideConfirmationDialog();
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