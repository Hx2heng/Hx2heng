import '../css/content.scss';

import './components/nav';
import './components/share';
import './components/scrollToTop';
window.onload = () => {
    $(".socialShare").socialShare({
        content: $('.markdown-body').find('p').eq(0).html(),
        url: window.onload.href,
        title: $('.article-title').html(),

    });

    var ifm = document.getElementById("toolIframe");
    toolIframe.height = document.documentElement.clientHeight;
}