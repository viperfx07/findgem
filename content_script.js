
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	var anchors = $('.rs-ad-title > a[itemprop="url"]');
  	var hrefs = [];
  	for (var i = anchors.length - 1; i >= 0; i--) {
  		hrefs.push($(anchors[i]).prop('href'));
  	};
    var hrefjoin = hrefs.join();
    if(hrefjoin.length>0)
	    sendResponse({farewell: hrefjoin});
	}
);

