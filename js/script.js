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

$(document).ready(function(){
    stickyTop();
    initMenuRef("#header .headLogo", "#splashPage");
    initMenuRef("#aboutNav", "#aboutPage");
    initMenuRef("#timelineNav", "#timelinePage");
});

$window.resize(function() {
    stickyTop();
});
$window.scroll(function() {
    stickyTop();
});


