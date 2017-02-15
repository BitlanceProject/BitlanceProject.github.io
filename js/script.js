var $window = $(window);
var $header = $("#header");
var $logo = $(".splashPage .logoSection");

function scrollTo(element, time){
    if(!time) time = 300;
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, time);
}

function initMenuRef(button, ref){
    $(button).click(function(){
        scrollTo(ref);
    });
}

function stickyTop() {
    //$header.toggleClass("scrolled",($window.height()-$header.outerHeight()<=$window.scrollTop()));
    $header.toggleClass("scrolled",($window.height()-500<=$window.scrollTop()));
    $logo.toggleClass("scrolled",($window.height()-500<=$window.scrollTop()));
    $logo.css("margin-top",$window.scrollTop()/2);
}


function validateEmail(email){

    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email || !email.length || !regexp.test(email)){
        return false;
    }
    return true;
}


function initSubscribeForm(){

    var box = $(".subscribeBox");
    var form = box.find("#subscribe-form");
    var text = box.find(".msgBox");

    var input = form.find("[name=EMAIL]");
    var url = form.attr("action").replace("/post?","/post-json?");

    form.submit(function(e){
        e.preventDefault();
        text.html("");
        if(!validateEmail(input.val())){
            text.html("invalid email format");
            box.addClass("error");
        }else{
            box.removeClass("error");
            input.attr("disabled","disabled");
            $.ajax({
                type: "GET",
                url: url,
                data: form.serialize(),
                cache: false,
                dataType: "jsonp",
                jsonp: "c",
                contentType: "application/json; charset=utf-8",
                error: function(error){
                    input.removeAttr("disabled");
                },
                success: function(data){
                    input.removeAttr("disabled");
                    if (data.result != "success") {
                        var message;

                        if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                            message = "You're already subscribed. Thank you.";
                        }else{
                            box.addClass("error");
                            message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                        }
                        text.html(message);

                    } else {
                        text.html("Thank you!<br>You must confirm the subscription in your inbox.");
                    }
            }});
        }
    });
}

$(document).ready(function(){
    stickyTop();
    initMenuRef("#header .headLogo", "#splashPage");
    initMenuRef("#aboutNav", "#aboutPage");
    initMenuRef("#timelineNav", "#timelinePage");
    initSubscribeForm();
});

$window.resize(function() {
    stickyTop();
});
$window.scroll(function() {
    stickyTop();
});


