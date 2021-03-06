import express from 'express'
import { checkLogin, checkNotLogin } from './middlewares/check.js'
import AdminsModel from './models/admins'
import ArticlesModel from './models/articles'
import GamesModel from './models/games'
import ToolsModel from './models/tools'
import moment from 'moment'
import multer from 'multer'
import path from 'path'


let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', checkLogin, (req, res) => {
    res.render('admin', { type: 'banner', admin: req.session.admin.name });
})
router.get('/admin-article', checkLogin, (req, res) => {

    res.render('admin', { type: 'admin-article', admin: req.session.admin.name });
})
router.get('/admin-game', checkLogin, (req, res) => {

    res.render('admin', { type: 'admin-game', admin: req.session.admin.name });
})
router.get('/admin-tool', checkLogin, (req, res) => {

    res.render('admin', { type: 'admin-tool', admin: req.session.admin.name });
})

//根据当前用户用户查询所有文章
router.get('/getAllArticles', checkLogin, (req, res) => {
    ArticlesModel.findAllArticles(req.session.admin.name).then((articles) => {
        return res.json(articles);
    }).catch((err) => {
        req.flash('error', err);
        return res.redirect('back');
    });;

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
            req.flash('error', err);
            return res.redirect('back');
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
            req.flash('error', err);
            return res.redirect('back');
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
            req.flash('error', err);
            return res.redirect('back');
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
        // console.log(req.body);
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
                req.flash('error', err);
                return res.redirect('back');
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
            req.flash('error', err);
            return res.redirect('back');
        })

    })
    //根据当前用户新增标签
router.get('/addArtcleTag', checkLogin, (req, res) => {
        let newTagName = req.query.newTagName;
        AdminsModel.addArtcleTagsByAdmin(req.session.admin.name, newTagName).then((message) => {
            return res.send(message);
        }).catch((err) => {
            req.flash('error', err);
            return res.redirect('back');
        });

    })
    //根据当前用户删除标签
router.get('/delArtcleTag', checkLogin, (req, res) => {
    let tags = req.query.tags;
    AdminsModel.delArtcleTagsByAdmin(req.session.admin.name, tags).then((message) => {
        return res.send(message);
    }).catch((err) => {
        req.flash('error', err);
        return res.redirect('back');
    });

})


//发表游戏页-------------------------------
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/images/'))
    },
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

var upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 } }).single('gameBgImg');

router.post('/createGame', checkLogin, (req, res) => {

    upload(req, res, function(err) {
        var title = req.body.gameTitle;
        var content = req.body.gameContent;
        var url = req.body.gameUrl;
        var bgImgSrc = '';
        if (err) {
            req.flash('error', '图片上传错误');
            return res.redirect('back');
        }
        try {
            if (!title.length) {
                throw new Error('请填写标题');
            }

        } catch (e) {
            req.flash('error', e.message);
            return res.redirect('back');
        }
        if (req.file) {
            req.flash('success', '图片上传成功');
            bgImgSrc = req.file.filename;
        }
        var game = {
                title: title,
                content: content,
                url: url,
                author: req.session.admin.name,
                bgImg: bgImgSrc,
                pv: 0,
                createDate: moment().format('YYYY/M/D'),
                createTime: moment().format('HH:mm')
            }
            //上传游戏
        GamesModel.createGames(game).then((message) => {
            req.flash('success', message);
            return res.redirect('back');
        }).catch((err) => {
            req.flash('error', err);
            return res.redirect('back');
        })
    })

    // console.log(gameBgImg);


})

//根据当前用户用户查询所有游戏
router.get('/getAllGames', checkLogin, (req, res) => {
        GamesModel.findAllGames(req.session.admin.name).then((games) => {
            return res.json(games);
        });
    })
    //根据id查询某个游戏
router.get('/getGameById', checkLogin, (req, res) => {
        let id = req.query.id;
        if (!id) {
            req.flash('error', '参数错误');
            return res.redirect('back');
        }
        GamesModel.findGameById(id).then((game) => {
            return res.json(game);
        }).catch((err) => {
            req.flash('error', err);
            return res.redirect('back');
        });
    })
    //根据id删除某个游戏
router.get('/deleteGameById', checkLogin, (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('error', '参数错误');
        return res.redirect('back');
    }
    GamesModel.deleteGameById(id).then((message) => {
        req.flash('success', message);
        return res.send(message);
    }).catch((err) => {
        req.flash('error', err);
        return res.redirect('back');
    });
})

//根据id修改某个游戏
router.post('/updateGame/:id', checkLogin, (req, res) => {

    upload(req, res, function(err) {
        var title = req.body.gameTitle;
        var content = req.body.gameContent;
        var url = req.body.gameUrl;
        var id = req.params.id;
        var bgImgSrc = '';
        console.log('update:', id);
        // 校验参数
        try {
            if (!title.length) {
                throw new Error('请填写标题');
            }
        } catch (e) {
            req.flash('error', e.message);
            return res.redirect('back');
        }
        if (req.file) {
            req.flash('success', '图片上传成功');
            bgImgSrc = req.file.filename;
        }

        var newGame = {
            _id: id,
            title: title,
            content: content,
            bgImg: bgImgSrc,
            url: url
        }

        GamesModel.updateOneGame(newGame).then((message) => {
            req.flash('success', message);
            return res.redirect('back');
        }).catch((err) => {
            req.flash('error', err);
            return res.redirect('back');

        })
    })




})





//发表工具页-------------------------------
router.post('/createTool', checkLogin, (req, res) => {
    var title = req.body.toolTitle;
    var type = req.body.toolType;
    var url = req.body.toolUrl;
    var content = req.body.toolContent;
    var description = req.body.toolDescription;
    // console.log(gameBgImg);
    // 校验参数
    try {
        if (!type.length) {
            throw new Error('请填写类型');
        }
        if (!url.length) {
            throw new Error('请填写链接');
        }
        if (!title.length) {
            throw new Error('请填写名字');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }
    var tool = {
            title: title,
            type: type,
            url: url,
            content: content,
            description: description,
            author: req.session.admin.name,
            pv: 0,
            createDate: moment().format('YYYY/M/D'),
            createTime: moment().format('HH:mm')
        }
        //上传工具
    ToolsModel.createTools(tool).then((message) => {
        req.flash('success', message);
        return res.redirect('back');
    }).catch((err) => {
        return res.status(403).send(err)
    })

})

//根据当前用户用户查询所有工具
router.get('/getAllTools', checkLogin, (req, res) => {
        ToolsModel.findAllTools(req.session.admin.name).then((tools) => {
            return res.json(tools);
        });
    })
    //根据id查询某个工具
router.get('/getToolById', checkLogin, (req, res) => {
        let id = req.query.id;
        if (!id) {
            req.flash('error', '参数错误');
            return res.redirect('back');
        }
        ToolsModel.findToolById(id).then((tool) => {
            return res.json(tool);
        }).catch((err) => {
            return res.status(404).end(err);
        });
    })
    //根据id删除某个工具
router.get('/deleteToolById', checkLogin, (req, res) => {
    let id = req.query.id;
    if (!id) {
        req.flash('error', '参数错误');
        return res.redirect('back');
    }
    ToolsModel.deleteToolById(id).then((message) => {
        req.flash('success', message);
        return res.send(message);
    }).catch((err) => {
        return res.status(403).send(err)
    });
})

//根据id修改某个工具
router.post('/updateTool/:id', checkLogin, (req, res) => {
    var title = req.body.toolTitle;
    var url = req.body.toolUrl;
    var type = req.body.toolType;
    var content = req.body.toolContent;
    var description = req.body.toolDescription;
    var id = req.params.id;

    // 校验参数
    try {
        if (!type.length) {
            throw new Error('请填写类型');
        }
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!type.length) {
            throw new Error('请填写链接');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    var newTool = {
        _id: id,
        title: title,
        type: type,
        content: content,
        description: description,
        url: url
    }

    ToolsModel.updateOneTool(newTool).then((message) => {
        req.flash('success', message);
        return res.redirect('back');
    }).catch((err) => {
        return res.status(403).send(err)

    })



})
export default router