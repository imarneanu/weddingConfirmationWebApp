function Notification() {}

Notification.sendPageAccessed = function(guestId, guestName) {
	var url = "https://iuliaalexwedding.firebaseio.com/token.json";
	var method = "GET";
	var async = true;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState == XMLHttpRequest.DONE) {
  			Notification.sendPageAccessedNotification(JSON.parse(request.responseText).token, guestId, guestName);
	    }
	}
	request.open(method, url, async);
	request.send(null);
};

Notification.sendPageAccessedNotification = function(token, guestId, guestName) {
	var today = Utils.getTodayDate();
	var postData = "{\"to\":\"" + token + "\",\"data\":{\"guest\":\"" + guestId + "\", \"name\":\"" + guestName + "\", \"timestamp\":\"" + today + "\"}}";

	Notification.sendNotification(postData);
};

Notification.sendConfirmation = function() {
	var url = "https://iuliaalexwedding.firebaseio.com/token.json";
	var method = "GET";
	var async = true;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState == XMLHttpRequest.DONE) {
  			Notification.sendConfirmationNotification(JSON.parse(request.responseText).token);
	    }
	}
	request.open(method, url, async);
	request.send(null);
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
	var accommodationPeriod = document.getElementById('accommodation-period').value;
	var comment = document.getElementById('comment').value;

	var today = Utils.getTodayDate();
	var postData = "{\"to\":\"" + token + "\",\"data\":{\"guest\":\"" + guestId + "\", \"name\":\"" + guestName + "\", \"plusOneName\":\"" + plusOneName 
		+ "\", \"accommodation\":\"" + accommodationPeriod + "\", \"comment\":\"" + comment + "\", \"timestamp\":\"" + today + "\"}}";

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