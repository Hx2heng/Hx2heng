function reinitIframe() {
    var iframe = document.getElementById("cy-frame");
    try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        var height = Math.max(bHeight, dHeight);
        iframe.height = height;
    } catch (ex) {}
}
setInterval(reinitIframe, 200); //定时去检查iframe的高度,这样保证时时都是自动高了