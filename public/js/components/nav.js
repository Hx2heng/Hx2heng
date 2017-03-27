import '../lib/bubble'
$('.nav').find('li').each(function() {
    $(this).on('mouseenter', function() {
        $(this).createBubble();
    })
    $(this).on('mouseleave', function() {
        $(this).cancelBubble();
    })
})