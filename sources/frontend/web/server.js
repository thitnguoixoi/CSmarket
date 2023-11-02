$("#back-to-top").fadeIn(),
$("#back-to-top").click((function() {
    return $("body,html").animate({
        scrollTop: 0
    }, 200),
    !1
}
));