import '../css/admin.scss';
import '../css/lib/bootstrap-markdown.min.css';
import './components/nav';
import './lib/bootstrap-markdown.js';
window.onload = () => {
    //提示框 alert
    if ($.trim($('.alert .alert-content').html())) {
        $('.alert').fadeIn();
    }
    //  文章管理页
    if ($('.admin-article').get(0)) {
        //获取文章列表到dom
        function getAllDataToTable() {
            $('.admin-list').find('tbody').empty();
            $.ajax({
                url: 'getAllArticles',
                type: 'get',
                success: (res) => {
                    var articles = res;
                    articles.map((item, i) => {
                        //日后改模板引擎法
                        var tr = $('<tr><th scope="row">' + (i + 1) + '</th><td>' + item.title + '</td><td>' + item.tags + '</td><td>' + item.createDate + '</td><td>' + item.author + '</td><td><button type="button" data-target="' + item._id + '" class="btn btn-info btn-xs btn-edit">编辑</button> <button type="button" data-target="' + item._id + '" class="btn btn-danger btn-xs btn-delete">删除</button></td></tr>')
                        $('.admin-list').find('tbody').append(tr);
                    })
                }
            })
        }
        getAllDataToTable();
        //获取所有文章标签
        function getAllArticleTagsToTagPanel() {
            $('.tags').empty();
            $.ajax({
                url: 'getAllArticleTags',
                type: 'get',
                success: (res) => {
                    var tags = res;
                    tags.map((item) => {
                        //日后改模板引擎法
                        var tag = $('<input type="checkbox" name="tag-' + item + '" id="tag-' + item + '"><label for="tag-' + item + '" data-type="' + item + '">' + item + '</label>');
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
                        $('.tags').append($('<input type="checkbox" name="tag-' + newTagName + '" id="tag-' + newTagName + '"><label for="tag-' + newTagName + '">' + newTagName + '</label>'));
                    },
                    error: (err) => {
                        alert(err.responseText);
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
                    if (!res) {
                        return false;
                    }
                    $('.admin-list').hide();
                    $('.admin-form').fadeIn();
                    $('.admin-form').find('form').attr('action', 'updateArticle/' + res._id);

                    insertEditor(res.title, res.content, res.tags);
                },
                error: (err) => {
                    console.log(err.responseText);
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
                            getAllDataToTable();
                        }
                    })
                } else {
                    return false
                }

            })
            //删除标签
        $('#delTags').on('click', function() {
            var selectedTags = [];
            $('.tags').find('input').each(function() {
                if ($(this).is(':checked')) selectedTags.push($.trim($(this).attr('name').slice(4)));
            })
            if (selectedTags.length == 0) {
                return;
            }
            var r = confirm("确定删除这些标签吗？" + selectedTags);
            if (r == true) {
                $.ajax({
                    url: 'delArtcleTag',
                    type: 'get',
                    data: { tags: selectedTags },
                    success: (res) => {
                        getAllArticleTagsToTagPanel();
                    },
                    error: (err) => {

                    }
                })
            } else {
                return false;
            }
        })

        //清空编辑器
        function clearEditor() {
            $('#articleContent').val('');
            $('#articleTitle').val('');
            $('.tags').find('input[type="checkbox"]').each(function() {
                $(this).prop('checked', false);
            })
        }

        //插入内容到编辑器
        function insertEditor(title, content, tags) {
            clearEditor();
            $('#articleTitle').val(title);
            $('#articleContent').val(content);
            tags.map((item) => {
                $('.tags').find('input[name=tag-' + item + ']').each(function() {
                    //新版本这里需要用到prop而不是attr
                    $(this).prop('checked', true)
                })
            })
        }

        //文本编辑框初始化
        $('#articleContent').markdown({ autofocus: false, savable: false });

        //新建文章
        $('.btn-create').on('click', function() {
            clearEditor();
            $('.admin-list').hide();
            $('.admin-form').show();
        })

        //取消发布
        $('.btn-cancle').on('click', function() {
            clearEditor();
            $('.admin-form').hide();
            $('.admin-list').show();
            $('.admin-form').find('form').attr('action', 'createArticle');
        })

        //提交文章
        $('.admin-form').on('submit', function() {
            var $btn = $('.btn-submit').button('loading');
        })
    }









    //  --------------------------------------------------------------------------------------------游戏管理页
    if ($('.admin-game').get(0)) {
        //获取文章列表到dom
        function getAllDataToTable() {
            $('.admin-list').find('tbody').empty();
            $.ajax({
                url: 'getAllGames',
                type: 'get',
                success: (res) => {
                    var games = res;
                    games.map((item, i) => {
                        //日后改模板引擎法
                        var tr = $('<tr><th scope="row">' + (i + 1) + '</th><td>' + item.title + '</td><td>' + item.createDate + '</td><td>' + item.author + '</td><td><button type="button" data-target="' + item._id + '" class="btn btn-info btn-xs btn-edit">编辑</button> <button type="button" data-target="' + item._id + '" class="btn btn-danger btn-xs btn-delete">删除</button></td></tr>')
                        $('.admin-list').find('tbody').append(tr);
                    })
                }
            })
        }
        getAllDataToTable();
        //编辑游戏
        $('.admin-list').on('click', '.btn-edit', function() {
            var gameId = $(this).attr('data-target');
            $.ajax({
                url: 'getGameById',
                type: 'get',
                data: { id: gameId },
                success: (res) => {
                    if (!res) {
                        return false;
                    }
                    $('.admin-list').hide();
                    $('.admin-form').fadeIn();
                    $('.admin-form').find('form').attr('action', 'updateGame/' + res._id);

                    insertEditor(res.title, res.content, res.url, res.bgImg);
                },
                error: (err) => {
                    console.log(err.responseText);
                }
            })
        })

        //删除文章
        $('.admin-list').on('click', '.btn-delete', function() {
            var r = confirm("确定删除这个游戏吗？");
            if (r == true) {
                var gameId = $(this).attr('data-target');
                $.ajax({
                    url: 'deleteGameById',
                    type: 'get',
                    data: { id: gameId },
                    success: (res) => {
                        getAllDataToTable();
                    }
                })
            } else {
                return false
            }

        })


        //清空编辑器
        function clearEditor() {
            $('#gameContent').val('');
            $('#gameTitle').val('');
            $('#gameUrl').val('');
            $('#gameBgImgText').val('');
            $('#pre-gameBgImg').attr('src', '');
        }

        //插入内容到编辑器
        function insertEditor(title, content, url, bgImg) {
            clearEditor();
            $('#gameTitle').val(title);
            $('#gameContent').val(content);
            $('#gameUrl').val(url);
            $('#gameBgImgText').val(bgImg);
            $('#pre-gameBgImg').attr('src', '../images/' + bgImg);

        }

        //文本编辑框初始化-
        $('#articleContent').markdown({ autofocus: false, savable: false });

        //新建
        $('.btn-create').on('click', function() {
                clearEditor();
                $('.admin-list').hide();
                $('.admin-form').show();
            })
            //提交
        $('.admin-form').on('submit', function() {
                var $btn = $('.btn-submit').button('loading');
            })
            //取消发布
        $('.btn-cancle').on('click', function() {
            clearEditor();
            $('.admin-form').hide();
            $('.admin-list').show();
            $('.admin-form').find('form').attr('action', 'createGame');
        })

        //图片文件
        $('#gameBgImg').on('change', function(e) {
            //通过input files添加图片
            var _this = this,
                files = this.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var imageType = /image.*/;
                //通过type属性进行图片格式过滤 
                var type = file.type.split("/")[1];

                if (!file.type.match(imageType)) {
                    alert('请选择图片');
                    continue;
                }
                if (file.size > 1024 * 1024) {
                    alert("你上传的文件太大了！请重新选择");
                    continue;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.type = type;
                reader.onload = function(e) {
                    //e.target.result返回的即是图片的dataURI格式的内容 
                    $('#pre-gameBgImg').attr('src', e.target.result);
                }
            }
        })

        $('.btn-delBg').on('click', function() {
            console.log(2);
            $('#gameBgImg').val('');
            $('#pre-gameBgImg').attr('src', '');
        })


    }


    //  --------------------------------------------------------------------------------------------工具管理页
    if ($('.admin-tool').get(0)) {
        //获取工具列表到dom
        function getAllDataToTable() {
            $('.admin-list').find('tbody').empty();
            $.ajax({
                url: 'getAllTools',
                type: 'get',
                success: (res) => {
                    var tools = res;
                    console.log(res);
                    tools.map((item, i) => {
                        //日后改模板引擎法
                        var tr = $('<tr><th scope="row">' + (i + 1) + '</th><td>' + item.title + '</td><td>' + item.type + '</td><td>' + item.author + '</td><td>' + item.createDate + '</td><td><button type="button" data-target="' + item._id + '" class="btn btn-info btn-xs btn-edit">编辑</button> <button type="button" data-target="' + item._id + '" class="btn btn-danger btn-xs btn-delete">删除</button></td></tr>')
                        $('.admin-list').find('tbody').append(tr);
                    })
                }
            })
        }
        getAllDataToTable();
        //编辑工具
        $('.admin-list').on('click', '.btn-edit', function() {
            var toolId = $(this).attr('data-target');
            $.ajax({
                url: 'getToolById',
                type: 'get',
                data: { id: toolId },
                success: (res) => {
                    if (!res) {
                        return false;
                    }
                    $('.admin-list').hide();
                    $('.admin-form').fadeIn();
                    $('.admin-form').find('form').attr('action', 'updateTool/' + res._id);

                    insertEditor(res.title, res.type, res.url, res.content, res.description);
                },
                error: (err) => {
                    console.log(err.responseText);
                }
            })
        })

        //删除工具
        $('.admin-list').on('click', '.btn-delete', function() {
            var r = confirm("确定删除这个工具吗？");
            if (r == true) {
                var toolId = $(this).attr('data-target');
                $.ajax({
                    url: 'deleteToolById',
                    type: 'get',
                    data: { id: toolId },
                    success: (res) => {
                        getAllDataToTable();
                    }
                })
            } else {
                return false
            }

        })


        //清空编辑器
        function clearEditor() {
            $('#toolTitle').val('');
            $("input[name='toolType']").removeAttr("checked");
            $('#toolUrl').val('');
            $('#toolContent').val('');
            $('#toolDescription').val('');
        }
        //文本域控制
        $("input[name='toolType']").on('change', function() {

            if ($("input[name='toolType']:checked").val() == '插件') {
                $('.content-editor').show();
            } else {
                $('.content-editor').hide();
            }
        });
        //插入内容到编辑器
        function insertEditor(title, type, url, content, description) {
            clearEditor();
            $('#toolTitle').val(title);
            $("input[name='toolType'][value='" + type + "']").attr("checked", true);
            $('#toolUrl').val(url);
            $('#toolContent').val(content);
            $('#toolDescription').val(description);
            if ($("input[name='toolType']:checked").val() == '插件') {
                $('.content-editor').show();
            } else {
                $('.content-editor').hide();
            }
        }

        //文本编辑框初始化-
        $('#articleContent').markdown({ autofocus: false, savable: false });

        //新建
        $('.btn-create').on('click', function() {
                clearEditor();
                $('.admin-list').hide();
                $('.admin-form').show();
            })
            //提交
        $('.admin-form').on('submit', function() {
                var $btn = $('.btn-submit').button('loading');
            })
            //取消发布
        $('.btn-cancle').on('click', function() {
            clearEditor();
            $('.admin-form').hide();
            $('.admin-list').show();
            $('.admin-form').find('form').attr('action', 'createGame');
        })

    }




}