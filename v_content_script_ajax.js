function callPageDetailsUrl(url){
	$.get(url, function(data) {
		
		console.log($('.reply-form-name',data).eq(0).html() + ' - ' + url);
    });
}

function callPageListingUrl(url){
	console.log(url);
	$.get(url, function(data) {
		$.each($("a[itemprop='url']",data),function(){
			callPageDetailsUrl($(this).prop('href'));
		})
    });
}

function sendToBackground(url){
	chrome.runtime.sendMessage({url: url, type: 'else'}, {});
}

if (document.location.pathname.indexOf("s-ad") < 0) {
    var listingpageUrl = document.location.pathname;

    //get last page link element and split it
    var lastSplit = $(".rs-paginator-btn.last").prop('href').split('/');
    var totalPages = parseInt(lastSplit[lastSplit.length-2].replace("page-",""));
    // totalPages = 1;
    var url = listingpageUrl;

    for (var i = 1; i <= totalPages; i++) {
        if (i > 1) {
            var urlArray = listingpageUrl.split("/");
            urlArray.splice(urlArray.length - 1, 0, "page-" + i)
            url = urlArray.join("/");
        }
        sendToBackground(url);
    }
} 
else if (document.location.pathname.indexOf("s-ad") >= 0) {
    // scroll carousel to last image
    $('.jcarousel-control-next').click();

    //add details in the enquiry
    $("#contactPosterForm #message").val("0430303885");
    $("#contactPosterForm #from").val("deffry_septian@hotmail.com");
    $("#contactPosterForm #viewad-contact-name").val("Deffry Septian Prajito");

    // $("#contactPosterForm #message").val("0423275435");
    // $("#contactPosterForm #from").val("indra.arifin@gmail.com");
    // $("#contactPosterForm #viewad-contact-name").val("Indra Arifin");

    $("#contactPosterForm #sendCopyToSender").prop('checked', true);
    $('.checkbox-replica[data-name="sendCopyToSender"]').addClass('checked');
}