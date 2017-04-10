$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    if (scrollTop >= 500) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
})

$('.scroll-to-top').on('click', function() {
    $(window).scrollTop(0)
})