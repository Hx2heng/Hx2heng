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
}