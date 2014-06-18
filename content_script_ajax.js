chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
            sendResponse({
                farewell: JSON.parse(localStorage["gtArrayAccepted"])
            });
    }
);

if (document.location.pathname == '/pro-seller-signup.html') {
    console.log("Reset gtArray");
    localStorage["gtArrayRejected"] = JSON.stringify([]);
    localStorage["gtArrayAccepted"] = JSON.stringify([]);
} else if (document.location.pathname.indexOf("s-ad") < 0) {
    //remove listings that have no pictures
    $('.placeholder-image').parent().parent().parent().parent().remove();
    
    var myArrayAccepted = [],
        myArrayRejected = JSON.parse(localStorage["gtArrayRejected"]),
        urls = $("div[itemprop='offers'] a[itemprop='url']"),
        counter = 0;
    
    urls.each(function(index){
        var url = this.href,
            url_split = url.split("/"),
            id = url_split[url_split.length - 1],
            id_exists = $.inArray(id, myArrayRejected);
        
        if (id_exists >= 0){
        	counter++;
        	if (counter == urls.length) {
                var tallyArrayAccepted = $.unique($.merge(JSON.parse(localStorage["gtArrayAccepted"]), myArrayAccepted)),
                    tallyArrayRejected = myArrayRejected;
                
                localStorage["gtArrayAccepted"] = JSON.stringify(tallyArrayAccepted);
                localStorage["gtArrayRejected"] = JSON.stringify(tallyArrayRejected);
                console.log(tallyArrayAccepted);
                setTimeout(function(){$('.rs-paginator-btn.next .rs-text').click()}, 1000);
            }
        } else {
			$.ajax({
				url: url
			}).done(function(data) {
				var el = $(data),
					name = el.find('.reply-form-name').eq(0).html(),
					member_since = el.find('.reply-form-since').eq(0).html(),
					last_seen = el.find('.reply-form-since strong').html(),
					phone_exists = el.find("#reply-form-phone").length,
					pic_count = el.find("li.carousel-item").length;
					
					counter++;
					
					// .replace(/[^\d]/g, '')
					console.log(counter + " of " + urls.length + ": " + id + ", " + name + ", " +  member_since + ", " +  last_seen + ", " +  phone_exists + ", " + pic_count);
				
				if (
					// no name
					name == undefined
					// name has space
					|| (name.indexOf(" ") > 0)
					// check if member since 2014
					|| member_since === undefined
					|| member_since.match(/2014/) == null
					// check if last seen today or yesterday
					|| last_seen === undefined
					|| !(last_seen == 'today' || last_seen == 'yesterday')
					// phone number exists
					|| phone_exists
					// less than one picture
					|| (pic_count < 4)
					){
					myArrayRejected.push(id);
				} else {
					console.log('Possible match');
					myArrayAccepted.push(id);
					chrome.runtime.sendMessage({url: url}, {});
				}
			
				if (counter == urls.length) {
					var tallyArrayAccepted = $.unique($.merge(JSON.parse(localStorage["gtArrayAccepted"]), myArrayAccepted)),
						tallyArrayRejected = myArrayRejected;
					
					localStorage["gtArrayAccepted"] = JSON.stringify(tallyArrayAccepted);
					localStorage["gtArrayRejected"] = JSON.stringify(tallyArrayRejected);
					console.log(tallyArrayAccepted);
					// console.log(tallyArrayRejected;
					setTimeout(function(){$('.rs-paginator-btn.next .rs-text').click()}, 1000);
				}
			});
		}
    });
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