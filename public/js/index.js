import '../css/index.scss';
import './components/nav';
import './components/scrollToTop';
window.onload = () => {
    //滚动加载
    var skip = 5,
        limit = 1,
        isReqing = false;
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            if (!isReqing) {
                isReqing = true;
                $.ajax({
                    url: 'getArticlesByLimter/',
                    data: { limit: limit, skip: skip },
                    type: 'get',
                    ifModified: true,
                    success: function(res) {
                        skip += limit;
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
                                article.find('.article-title').attr('href', '/article?id=' + item._id).html(item.title);
                                article.find('.article-author').html('From:' + item.author);
                                article.find('.markdown-body').html(item.content);
                                article.find('.article-date').html(item.createDate + ' ' + item.createTime);
                                article.find('.article-entry').css('display', 'block');
                                article.find('.article-tags').empty();
                                item.tags.map(function(tag) {
                                    article.find('.article-tags').append('<label data-type="' + tag + '">' + tag + '</label> ');
                                });
                                article.find('.article-tags').append('<a href="javascript:" class="content-scrollUp"><span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span> 收起</a>');
                                $('.article-list').append(article);
                            })
                            isReqing = false;

                        }
                    }
                })
            }


        }


    });

    //文章收起展开
    $('.article-list').on('click', '.content-scrollUp', function() {
            $(this).parents('.article-header').siblings('.article-entry').toggle();
            $(this).parents('.article-header').siblings('.article-info').toggle();
            if ($(this).parents('.article-header').siblings('.article-entry').css('display') == 'none') {
                $(this).html('<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span> 展开');
                $(window).scrollTop($(this).parents('.article-inner').offset().top - 90);
            } else {
                $(this).html('<span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span> 收起');
            }
        })
        //文章头部固定
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        $('.article').each(function() {
            var toTop = $(this).offset().top;
            var height = $(this).height();
            if (scrollTop >= toTop && scrollTop < (toTop + height - $(this).find('.article-header').height() - 70) && height > 500) {
                $(this).find('.article-header').eq(0).css('top', scrollTop - toTop + 50)
            } else if (scrollTop >= (toTop + height - $(this).find('.article-header').height() - 70) && height > 500) {
                $(this).find('.article-header').eq(0).css('top', height - $(this).find('.article-header').height() - 20)
            } else {
                $(this).find('.article-header').eq(0).css('top', 0)
            }
        });
    })
}