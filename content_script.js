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


$(function(){
	$('#adsense-top').remove();
	$('#topads-sr-title').remove();
	$('#adsense-middle').remove();
	$('#srchrslt-adtable-topads').remove();
	$('#adsense-bottom').remove();

	$('div[id^="div-gpt-ad-"]').remove();
	$('#user-activity').remove();

	$('.placeholder-image').parents('li').remove();

	$("span[itemprop='name']").each(function(){
	    if($(this).html().match(/barber|bean|bed|bench|black|blue|burgundy|cabinet|chaise|chinese|computer|corner|dining|electric|floral|fold|fouton|freedom|fridge|futon|jimmy possum|ikea|lazyboy|l-shaped|massage|moran|office|ottoman|outdoor|pink|pair|plastic|purple|ratan|rattan|recliner|red|rocking|rossini|salmon|scali|set|sofabed|suite|stool|swivel|table|theatre|trailer|tv|two|wicker|2|3|4|5|6|7/i) != null){
	        $(this).parents('li').remove();
	    }
	});

	$(".rs-ad-description").each(function(){
	    var a = $(this).html();
	    
	    if(a.match(/blue|.com.au|ikea|nick scali|red|three-seater|three seater|two seater|2 seater|3 seater/i) != null){
	        $(this).parents('li').remove();
	    } else {
	        var acount = a.trim().replace( /[^\w ]/g, "" ).split( /\s+/ ).length;
	        if(acount < 7){
	        	$(this).parents('li').remove();
	        }
	    }
	});
})
