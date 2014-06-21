var website = 'http://www.gumtree.com.au';
var extUrl = 'chrome-extension://iadhkibmlocfallefjfifngpgjnfemnh/';
localStorage.gtArrayRejected = "";

chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            greeting: "hello"
        }, function(response) {
            var x = response.farewell.split(",");

            for (var i = x.length - 1; i >= 0; i--) {
                openTab(x[i]);
            };
        });
    });
});

//open page details url and also check based on criteria set using ajax
function callPageDetailsUrl(url){
    // console.log(url);
    $.ajax({
      dataType: "text",
      url: url,
      success: function(data) {
            data = data.replace(/<img[^>]*>/g,"");
            
            var url_split = url.split("/"),
                id = url_split[url_split.length - 1];

            var el = $(data),
                name = el.find('.reply-form-name').eq(0).html(),
                member_since = el.find('.reply-form-since').eq(0).html(),
                last_seen = el.find('.reply-form-since strong').html(),
                phone_exists = el.find("#reply-form-phone").length,
                pic_count = el.find("li.carousel-item").length,
                accepts_paypal = el.find('.reply-form-seller-accepts-paypal').length > 0,
                business_profile =  el.find(".business-profile").length;
            
              
                    
                var failpoint = "";
            
                if (false) {
                    if (name == undefined) { failpoint = "name: undefined" }
                    else if (name.indexOf(" ") > 0) { failpoint = "name: has space" }
                    else if (name.match(/^[A-Z][a-z]*$/) == null) { failpoint = "name: not title case" }
                    else if (member_since === undefined) { failpoint = "member since: undefined" }
                    else if (member_since.match(/2014/) == null) { failpoint = "member since: not 2014" }
                    else if (last_seen === undefined) { failpoint = "last seen: undefined" }
                    else if (!(last_seen == 'today' || last_seen == 'yesterday')) { failpoint = "last seen: not today or yesterday" }
                    else if (phone_exists) { failpoint = "phone: exists" }
                    else if (pic_count < 4) { failpoint = "pic count: less than 4" }
                    else if (accepts_paypal) { failpoint = "accepts paypal" }
                    else if (business_profile > 0) { failpoint = "business profile" }
                }
                    
                if (name == undefined
                    || name.indexOf(" ") > 0
                    || name.match(/^[A-Z][a-z]*$/) == null
                    || member_since === undefined
                    || member_since.match(/2014/) == null
                    || last_seen === undefined
                    || !(last_seen == 'today' || last_seen == 'yesterday')
                    || phone_exists
                    || pic_count < 4
                    || accepts_paypal
                    || business_profile > 0
                ) {
                    failpoint = "Y";
                }
            
                if (failpoint != "") {
                    if(localStorage.gtArrayRejected.length ==0)
                        localStorage.gtArrayRejected += id;
                    else
                    {
                        if(localStorage.gtArrayRejected.indexOf(id.toString()) <0)
                            localStorage.gtArrayRejected += "," + id;
                    }
                } else {
                    console.log('Possible match: ', id);
                    openTab(url);
                }
        }
    });
}

function openTab(url)
{
    chrome.tabs.create({url: url,active: false});
}

//open page listing page using ajax
function callPageListingUrl(url){
    $.ajax({
      url: url,
      success: function(data)
      {
        data = data.replace(/<img[^>]*>/g,"");
        $.each($("div[itemprop='offers'] a[itemprop='url']",data),function(){
            var itemUrlSplit = $(this).prop('href').split("/");
            var id = itemUrlSplit[itemUrlSplit.length - 1];
            if(localStorage.gtArrayRejected.indexOf(id.toString()) < 0)
            {
                callPageDetailsUrl(website + '/s-ad/' + urlSplit.join('/'));
            }
        })
      }
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == 'openUrlInTab') {
            openTab(request.url)
        } else {
            callPageListingUrl(website + request.url);
        }
    }
);
