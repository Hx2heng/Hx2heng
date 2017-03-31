import '../css/admin.scss';
import '../css/lib/bootstrap-markdown.min.css';
import './components/nav';
import './lib/bootstrap-markdown.js';
window.onload = () => {
    //  文章管理页
    if ($('.admin-article').get(0)) {
        //获取文章列表到dom
        function getAllArticlesToTable() {
            $('.admin-list').find('tbody').empty();
            $.ajax({
                url: 'getAllArticles',
                type: 'get',
                success: (res) => {
                    var articles = res;
                    articles.map((item, i) => {
                        //日后改模板引擎法
                        var tr = $('<tr><th scope="row">' + (i + 1) + '</th><td>' + item.title + '</td><td><span class="label label-danger">H5</span> <span class="label label-info">JS</span> <span class="label label-warning">CSS</span></td><td>' + item.createDate + '</td><td>' + item.author + '</td><td><button type="button" data-target="' + item._id + '" class="btn btn-info btn-xs btn-edit">编辑</button> <button type="button" data-target="' + item._id + '" class="btn btn-danger btn-xs btn-delete">删除</button></td></tr>')
                        $('.admin-list').find('tbody').append(tr);
                    })
                }
            })
        }
        getAllArticlesToTable();
        //获取所有文章标签
        function getAllArticleTagsToTagPanel() {
            $('.tags').empty();
            $.ajax({
                url: 'getAllArticleTags',
                type: 'get',
                success: (res) => {
                    var tags = res;
                    tags.map((item, i) => {
                        //日后改模板引擎法
                        var tag = $('<input type="checkbox" name="tag-' + item + '" id="tag-javascript"><label for="tag-javascript">' + item + '</label>');
                        $('.tags').append(tag);
                    })
                }
            })
        }
        getAllArticleTagsToTagPanel();
        //新建标签
        $('#addTag').on('click', function() {

                var newTagName = $.trim($('#tagNameInput').val());
                if (!newTagName) {
                    alert('请输入标签名');
                    return
                }
                $.ajax({
                    url: 'addArtcleTag',
                    data: { newTagName: newTagName },
                    success: function(res) {
                        alert(res);
                        $('#addTagModal').modal('hide');
                        getAllArticleTagsToTagPanel();
                    }
                })
            })
            //编辑文章
        $('.admin-list').on('click', '.btn-edit', function() {

            var articleId = $(this).attr('data-target');
            $.ajax({
                url: 'getArticleById',
                type: 'get',
                data: { id: articleId },
                success: (res) => {
                    if (!res[0]) {
                        return false;
                    }
                    $('.admin-list').hide();
                    $('.admin-form').fadeIn();
                    $('.admin-form').find('form').attr('action', 'updateArticle/' + res[0]._id);
                    console.log(res);
                    clearEditor();
                    insertEditor(res[0].title, res[0].content);
                }
            })
        })

        //删除文章
        $('.admin-list').on('click', '.btn-delete', function() {
                var r = confirm("确定删除这篇文章吗？");
                if (r == true) {
                    var articleId = $(this).attr('data-target');
                    $.ajax({
                        url: 'deleteArticleById',
                        type: 'get',
                        data: { id: articleId },
                        success: (res) => {
                            console.log(res);
                            getAllArticlesToTable();
                        }
                    })
                } else {
                    return false
                }

            })
            //清空编辑器
        function clearEditor() {
            $('#articleContent').val('');
            $('#articleTitle').val('');
        }
        //插入内容到编辑器
        function insertEditor(title, content, tags) {
            $('#articleTitle').val(title);
            $('#articleContent').val(content);
        }

        //文本编辑框初始化
        $('#articleContent').markdown({ autofocus: false, savable: false });

        //新建文章
        $('.btn-create').on('click', function() {
            clearEditor();
            $('.admin-list').hide();
            $('.admin-form').fadeIn();
        })

        //取消发布
        $('.btn-cancle').on('click', function() {
            $('.admin-form').hide();
            $('.admin-list').fadeIn();
            $('.admin-form').find('form').attr('action', 'createArticle');
        })

        //提交文章
        $('.admin-form').on('submit', function() {
            console.log('fuck');
            var $btn = $('.btn-submit').button('loading');
        })
    }

}