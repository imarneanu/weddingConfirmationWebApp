function sendNotificationPageAccessed(token, guestId, guestName) {
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

	today = dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + min;

	var url = "https://fcm.googleapis.com/fcm/send";
	var method = "POST";
	var postData = "{\"to\":\"" + token + "\",\"data\":{\"guest\":\"" + guestId + "\", \"name\":\"" + guestName + "\", \"timestamp\":\"" + today + "\"}}";
	alert(postData);

	var async = true;
	var request = new XMLHttpRequest();

	request.onload = function () {
	    var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
		var data = request.responseText; // Returned data, e.g., an HTML document.
	    alert('status: ' + status + ' ' + data);
	}

	request.open(method, url, async);

	request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("Authorization", "key=AAAAqZqRnA0:APA91bGTTmNyjxL2yK8k8r4JTSa4jcVWFTDnZZEjW8WzFnCIbRYb9U30lHFHdZzyQgk_AuknDbj2DKS6SFzo5qP0FX9F3Xb05YXf_Y1Y2l7R8zHGkAJ5he-CyopJ2XIW2m71OSJtmEHk");
	request.send(postData);
}