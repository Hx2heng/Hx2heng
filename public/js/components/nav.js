import '../lib/bubble'
console.log('nav.js');
$('.nav').find('li').each(function() {
    $(this).on('mouseenter', function() {
        $(this).createBubble();
    })
    $(this).on('mouseleave', function() {
        $(this).cancelBubble();
    })
})