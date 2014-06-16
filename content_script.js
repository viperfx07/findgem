chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
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

if (document.location.host == 'www.cnet.com') {
    console.log('Reset gtArray');
    chrome.storage.local.set({gtArray: []});
    chrome.storage.local.get("gtArray", function(result) {
        console.log(result["gtArray"]);
    });
} else if (document.location.pathname.indexOf("s-ad") < 0) {
    
    // console.log(document.location);
    
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

    //remove activity
    $('#user-activity').remove();
    
    //put the paginator on the top
    $("#ad-listing-header").before($(".rs-paginator").clone());
    
    //remove listings that have no pictures
    $('.placeholder-image').parent().parent().parent().parent().remove();
    
    // remove if the listing has already been automatically checked and closed during previous search
    // checking it against the array in chrome.storage.local
    
    chrome.storage.local.get("gtArray", function(result) {
    
        var myArray = result["gtArray"];
            
        console.log(myArray);
            
        if (typeof(myArray) !== 'undefined' && myArray instanceof Array) {
            
            // looping through links
            $("div[itemprop='offers'] a[itemprop='url']").each(function(){
                var link = this.href,
                    list = link.split("/"),
                    id = list[list.length - 1];
                
                // remove if matches
                if ($.inArray(id,myArray) > -1) {
                    $(this).parents("li[itemprop='offers']").remove();
                }
            });
        }
    });
    
    // setting filter values
    // Electronics
    // var filter = /sony|nikon|olympus|panasonic|fujifilm|canon|kodak|zeiss|logitech|gopro|taron|sigma|lowerpro|jvc|samsung|pentax|lumix|apple|lg|epson|casio|konica|minolta|kogan|hoya|fuji|ricoh|toshiba|netgear|nec|soniq|palsonic|sharp|soniq|pioneer|phillips|philips|hitachi|agora|tcl|blaupunkt|sanyo|foxtel|ikea|dell|hp|hisense|harmon|kardon|lenovo|apple|macbook|msi|patriot|viewsonic|compaq|asus|acer|brother|linksys|d-link|intel|amd|telstra|nexus|nvidia|seagate|western digital|benq|targus|microsoft|ibm|optus|kingston|belkin|corsair/i;
    // Home & Garden
    var filter = /\.com\.au|\.net\.au|a1a|admac|airman|altise|amana|ardex|ariston|auger|avanti|bailey|balustrade|beefmaster|beurer|beko|blackridge|bisazza|bissell|blanco|blm|bluesky|bodum|bosch|breville|brickies|bugatti|caffitaly|caravaggi|changhong|coleman|daikin|decker|denyo|dishlex|delongh*i|dimplex|dishlex|duratech|dyson|electrolux|emerproof|espressotoria|euromaid|eurotag|everdure|excellsar|ezarri|fixit|freedom|frigidair|gladz|gmc|godfrey|goodair|goldair|goldstein|griffin|gustav|h2o|hardieflex|hisense|htc|hobbs|homewell|honda|hoover|hundisun|ilve|ipad|iphone|ikea|janome|kambrook|kcleaners|kelvinator|kenwood|keso|kleenmaid|krups|lifan|lonmax|lumia|luminarc|luxalite|l@@k|magimix|makita|martec|masport|maxwell|maytag|mcculloch|midea|miele|mistral|mitsubishi|monarch|nesperesso|ozito|nokia|panasonic|pelmen|peters|phillips|pmec|pristino|pullman|red bull|rheem|reo|rinnai|rohde|ronson|rothenberg|rover|ryobi|saeco|samsung|sanyo|sharp|sheridan|sherlock|siemens|simpson|smeg|stanley|starite|stiehl|stihl|sunbeam|tecoair|tefal|tolix|westinghouse|victa|vidal|whirlpool|wooki|zen/i;
    
    //remove if header title contains any of the filter values
    $("span[itemprop='name']").each(function() {
        if ($(this).html().match(filter) != null) {
            $(this).parents('li').remove();
        }
    });

    //remove if description contains any of the filter values
    $(".rs-ad-description, .rs-ad-attributes").each(function() {
        var a = $(this).html();

        if (a.match(filter) != null) {
            $(this).parents('li').remove();
        }
    });

} else if (document.location.pathname.indexOf("s-ad") >= 0)
{
    // set a function to add ID to chrome.storage.local
    function addToArray(){
    
       var link = window.location.href,
           list = link.split("/"),
           id = list[list.length - 1];
       
       chrome.storage.local.get("gtArray", function(result) {
               
           if ($.inArray(id,result["gtArray"]) == -1){
            // console.log('Adding to array');
               result["gtArray"].push(id);
           }
           
           // console.log(result["gtArray"]);
           
           chrome.storage.local.set(result);
       });
       window.close();
   }
    
    //if member since other than 2014, close
    if ($('.reply-form-since').length == 0)
        addToArray();
    else {
        var a = $('.reply-form-since').eq(0).html();
        if (a.match(/2014/) == null) {
            addToArray();
        }
    }

    // if on Gumtree not since today or yesterday, close it
    if ($('.reply-form-since strong').length == 0)
        addToArray();
    else {
        var b = $('.reply-form-since strong').html();
        if (!(b == 'today' || b == 'yesterday')) {
            addToArray();
        }
    }

    //if there's a phone number, close
    if ($("#reply-form-phone").length > 0)
        addToArray();

    //if less than one picture, close
    if ($("li.carousel-item").length < 2)
        addToArray();

    //if no name, close         
    if ($('.reply-form-name').length == 0) {
        addToArray();
    }
    else{
        //if name has space, close
        if($('.reply-form-name').html().indexOf(" ")>0)
            addToArray();
    }
    
    // if the window is not closed, then consider adding this into another array
    // this function is TBA

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