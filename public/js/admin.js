import '../css/admin.scss';
import '../css/lib/bootstrap-markdown.min.css';
import './components/nav';
import './lib/bootstrap-markdown.js';
window.onload = () => {
    //  文章管理页
    if ($('.admin-article').get(0)) {
        //获取文章列表
        function getAllArticlesToTable() {
            $.ajax({
                url: 'getAllArticles',
                type: 'get',
                success: (res) => {
                    console.log(res);
                    var articles = res;
                    res.map((item) => {
                        var tr = $('<tr><th scope="row">1</th><td>' + item.title + '</td><td><span class="label label-danger">H5</span> <span class="label label-info">JS</span> <span class="label label-warning">CSS</span></td><td>2017/08/09</td><td>' + item.author + '</td><td><button type="button" class="btn btn-info btn-xs">编辑</button> <button type="button" class="btn btn-danger btn-xs">删除</button></td></tr>')
                        $('.admin-list').find('tbody').append(tr);
                    })
                }
            })
        }
        getAllArticlesToTable();

        //文本编辑框初始化
        $('#articleContent').markdown({ autofocus: false, savable: false });
        //新建文章
        $('.btn-create').on('click', function() {
                $('.admin-list').hide();
                $('.admin-form').fadeIn();
            })
            //取消发布
        $('.btn-cancle').on('click', function() {
                $('.admin-form').hide();
                $('.admin-list').fadeIn();
            })
            //提交文章
        $('.admin-form').on('submit', function() {
            console.log('fuck');
            var $btn = $('.btn-submit').button('loading');
        })
    }

}