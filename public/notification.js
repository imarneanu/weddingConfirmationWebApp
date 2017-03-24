function sendNotificationPageAccessed(variable) {
	var url = "https://fcm.googleapis.com/fcm/send";
	var method = "POST";
	var postData = "{\"to\":\"fojBGdW-eqM:APA91bEJce0idSs-gHug6g6gMLg9fM0UGzCADsyTWMV6sxq7QSYtoT1RjfWFTVknzEIUeolpfSFUIbiWkFGV1bpCMgQbH8sr3PxcUDVer1Nt_GEECtDFu9WQIsDThZvAtR_pMDs48pIx\",\"data\":{\"guest\":\"" + variable + "\"}}";

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
}