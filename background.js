chrome.browserAction.onClicked.addListener(function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	    var x = response.farewell.split(",");
	    
	    for (var i = x.length - 1; i >= 0; i--) {
	    		chrome.tabs.create({url: x[i], active: false});
	    };
	  });
	});
});