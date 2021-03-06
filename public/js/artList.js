import './components/nav';
import '../css/list.scss';
import './components/scrollToTop';
window.onload = () => {
    //滚动加载
    var skip = 10,
        limit = 5,
        isReqing = false,
        type = $('.tag-select a.active').html() == '全部' ? '' : $('.tag-select a.active').html();
    console.log(type);
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            if (!isReqing) {
                isReqing = true;
                $.ajax({
                    url: 'artList/getArticlesByLimter/',
                    data: { type: type, limit: limit, skip: skip },
                    type: 'get',
                    ifModified: true,
                    success: function(res) {
                        skip += 5;
                        if (!res || res.length == 0) {
                            console.log('没有更多内容了');
                            $('.article-list').append('<div class="alert alert-warning alert-dismissible fade in" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' +
                                '没有更多内容了...' + '</div>'
                            )
                            return;
                        } else {
                            res.map(function(item) {
                                var article = $('.article-list .article').eq(0).clone();
                                article.find('.article-title').attr('href', '/article/article?id=' + item._id).html(item.title);
                                article.find('.article-author').html('From:' + item.author);
                                article.find('.article-date').html(item.createDate + ' ' + item.createTime);
                                article.find('.article-tags').empty();
                                item.tags.map(function(tag) {
                                    article.find('.article-tags').append('<label data-type="' + tag + '">' + tag + '</label> ');
                                });
                                $('.article-list').append(article);
                            })
                            isReqing = false;

                        }
                    }
                })
            }


        }


    });
}