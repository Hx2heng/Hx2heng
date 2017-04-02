import express from 'express'
import { checkLogin, checkNotLogin } from './middlewares/check.js'
import AdminsModel from './models/admins'
import ArticlesModel from './models/articles'
import moment from 'moment'

let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', checkLogin, (req, res) => {
    res.render('admin', { type: 'banner' });
})
router.get('/admin-article', checkLogin, (req, res) => {

    res.render('admin', { type: 'admin-article' });
})


//根据当前用户用户查询所有文章
router.get('/getAllArticles', checkLogin, (req, res) => {
    ArticlesModel.findAllArticles(req.session.admin.name).then((articles) => {
        return res.json(articles);
    });

})

//根据id查询某篇文章
router.get('/getArticleById', checkLogin, (req, res) => {
        let id = req.query.id;
        if (!id) {
            req.flash('error', '参数错误');
            return res.redirect('back');
        }
        ArticlesModel.findArticleById(id).then((article) => {

            return res.json(article);
        }).catch((err) => {
            return res.status(404).end(err);
        });
    })
    //根据id删除某篇文章
router.get('/deleteArticleById', checkLogin, (req, res) => {
        let id = req.query.id;
        if (!id) {
            req.flash('error', '参数错误');
            return res.redirect('back');
        }
        ArticlesModel.deleteArticleById(id).then((message) => {
            req.flash('success', message);
            return res.send(message);
        }).catch((err) => {
            return res.status(403).send(err)
        });
    })
    //根据id修改某篇文章
router.post('/updateArticle/:id', checkLogin, (req, res) => {
    var title = req.body.articleTitle;
    var content = req.body.articleContent;
    var id = req.params.id;
    var tags = [];

    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
        if (!id) {
            throw new Error('参数错误');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    //获取当前用户所有标签
    AdminsModel.findAllArticleTagsByAdmin(req.session.admin.name).then((articleTags) => {

        //进行标签匹配
        articleTags.map((item) => {
            if (req.body['tag-' + item] == 'on') {
                tags.push(item)
            }
        })
        var newArticle = {
            _id: id,
            title: title,
            content: content,
            tags: tags
        }

        ArticlesModel.updateOneArticle(newArticle).then((message) => {
            req.flash('success', message);
            return res.redirect('back');
        }).catch((err) => {
            return res.status(403).send(err)
        });

    }).catch((err) => {
        req.flash('error', err);
        return res.redirect('back');
    })



})

//发表文章页
router.post('/createArticle', checkLogin, (req, res) => {
        var title = req.body.articleTitle;
        var content = req.body.articleContent;
        var tags = [];

        console.log(req.body);
        // 校验参数
        try {
            if (!title.length) {
                throw new Error('请填写标题');
            }
            if (!content.length) {
                throw new Error('请填写内容');
            }
        } catch (e) {
            req.flash('error', e.message);
            return res.redirect('back');
        }
        //获取当前用户所有标签
        AdminsModel.findAllArticleTagsByAdmin(req.session.admin.name).then((articleTags) => {

            //进行标签匹配
            articleTags.map((item) => {
                if (req.body['tag-' + item] == 'on') {
                    tags.push(item)
                }
            })
            var article = {
                title: title,
                content: content,
                tags: tags,
                author: req.session.admin.name,
                pv: 0,
                createDate: moment().format('YYYY/M/D'),
                createTime: moment().format('HH:mm')
            };
            //上传文章
            ArticlesModel.createArticles(article).then((message) => {
                req.flash('success', message);
                return res.redirect('back');
            }).catch((err) => {
                return res.status(403).send(err)
            })

        }).catch((err) => {
            req.flash('error', err);
            return res.redirect('back');
        })





    })
    //获取当前用户所有标签
router.get('/getAllArticleTags', checkLogin, (req, res) => {
        AdminsModel.findAllArticleTagsByAdmin(req.session.admin.name).then((articleTags) => {
            return res.send(articleTags);
        }).catch((err) => {
            return res.status(404).send(err)
        })

    })
    //根据当前用户新增标签
router.get('/addArtcleTag', checkLogin, (req, res) => {
        let newTagName = req.query.newTagName;
        AdminsModel.addArtcleTagsByAdmin(req.session.admin.name, newTagName).then((message) => {
            return res.send(message);
        }).catch((err) => {
            return res.status(403).send(err)
        });

    })
    //根据当前用户删除标签
router.get('/delArtcleTag', checkLogin, (req, res) => {
    let tags = req.query.tags;
    AdminsModel.delArtcleTagsByAdmin(req.session.admin.name, tags).then((message) => {
        return res.send(message);
    }).catch((err) => {
        return res.status(403).send(err)
    });

})


export default router