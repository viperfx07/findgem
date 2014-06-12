chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var anchors = $('.rs-ad-title > a[itemprop="url"]');
        var hrefs = [];
        for (var i = anchors.length - 1; i >= 0; i--) {
            hrefs.push($(anchors[i]).prop('href'));
        };

        var hrefjoin = hrefs.join();
        if (hrefjoin.length > 0)
            sendResponse({
                farewell: hrefjoin
            });
        window.location.href = $('.rs-paginator-btn.next').prop('href');
    }
);

if (document.location.pathname.indexOf("s-ad") < 0) {
    //remove header
    $("#header").remove();

    //remove top ads
    $('#srchrslt-adtable-topads').remove();
    $('#topads-sr-title').remove();

    //remove google stuff
    $('#adsense-top').remove();
	$('#adsense-middle').remove();
	$('#adsense-bottom').remove();
	$('div[id^="div-gpt-ad-"]').remove();

	//remove acitivity
	$('#user-activity').remove();

    //remove listings that have no pictures
    $('.placeholder-image').parent().parent().parent().parent().remove();

    //put the paginator on the top
    $(".c-hide-mobile").before($(".rs-paginator"));

    //remove if filters match
    var filter = /honda|hyosung|yamaha|harley|ktm|suzuki|ducati|aprilia|kymco|bmw|kawasaki|ikea|scali|piaggio|helmet|ninja|sidecar|stolen|swap|towing|wanted|buggy/i;
    $("span[itemprop='name']").each(function() {
        if ($(this).html().match(filter) != null) {
            $(this).parents('li').remove();
        }
    });

    //remove if filters match
    $(".rs-ad-description, .rs-ad-attributes").each(function() {
        var a = $(this).html();

        if (a.match(filter) != null) {
            $(this).parents('li').remove();
        }
    });

    //auto loading the page
    //if($(".rs-paginator-pager .selected:first").length > 0)
    //{
    //	window.location.href = $(".rs-paginator-pager .selected:first").next().prop('href')	
    //}
} 
else //if in ads details
{
    //if last edited, it's not today's date or tomorrows date, close it
    var todaysdate = '12/06/2014';
    var tomorrowsdate = '13/06/2014';
    var lastedited = $.trim($('#ad-details #ad-body-inner #ad-attributes .ad-attribute').eq(1).find('dd').html());

    if (!(lastedited == todaysdate || lastedited == tomorrowsdate)) {
        window.close();
    }

    //if member since other than 2014, close
    if ($('.reply-form-since').length == 0)
        window.close();
    else {
        var a = $('.reply-form-since').eq(0).html();
        if (a.match(/2014/) == null) {
            window.close();
        }
    }

    //if member not since today, close it
    if ($('.reply-form-since strong').length == 0)
        window.close();
    else {
        var b = $('.reply-form-since strong').html();
        if (!(b == 'today' || b == 'yesterday')) {
            window.close();
        }
    }

    //if there's a phone number, close it
    if ($("#reply-form-phone").length > 0)
        window.close();

    //if no picture, close it
    if ($("li.carousel-item").length < 1)
        window.close();

    //if no name, close       	
    if ($('.reply-form-name').length == 0) {
        window.close();
    }

    //add details in the enquiry
    // $("#contactPosterForm #message").val("0430303885");
    // $("#contactPosterForm #from").val("deffry_septian@hotmail.com");
    // $("#contactPosterForm #viewad-contact-name").val("Deffry Septian Prajito");

    $("#contactPosterForm #message").val("0423275435");
    $("#contactPosterForm #from").val("indra.arifin@gmail.com");
    $("#contactPosterForm #viewad-contact-name").val("Indra Arifin");

    $("#contactPosterForm #sendCopyToSender").prop('checked', true);
    $('.checkbox-replica[data-name="sendCopyToSender"]').addClass('checked');
}
