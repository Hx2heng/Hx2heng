function changeFrameHeight() {
    var ifm = document.getElementById("cy-frame");
    if (!ifm) return;
    ifm.height = document.documentElement.clientHeight;
}
changeFrameHeight();
window.onresize = function() {
    changeFrameHeight();
}