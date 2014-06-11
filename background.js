chrome.browserAction.onClicked.addListener(function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	    var x = response.farewell.split(",");
	    
	    for (var i = x.length - 1; i >= 0; i--) {
	    	if(x[i].toLowerCase().indexOf('gem') != -1)
	    		console.log(x[i]);

	    	// chrome.tabs.create({url: x[i]});

	    };
	  });
	});
});