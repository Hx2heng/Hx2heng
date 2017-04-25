import { ArticleModel } from '../lib/mongo';

const articles = {
    //上传一篇文章
    createArticles: (article) => {
        return new Promise((resolve, reject) => {
            var oneArticle = new ArticleModel(article);
            oneArticle.save((err) => {
                if (err) {
                    reject('上传文章失败');
                    return;
                }
                resolve('上传文章成功');
            });
        })
    },
    //查询所有文章/查询某个用户所有文章（如果有传参数name）
    findAllArticles: (name = 'all', limit = null, skip = 0) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (name && name != 'all') {
                query.author = name;
            }
            ArticleModel.find(query, null, { sort: { '_id': -1 } }, (err, articles) => {
                if (err) {
                    reject('找不到文章');
                    return;
                }
                resolve(articles)
            }).limit(limit).skip(skip);


        })
    },
    //根据Id查询某篇文章
    findArticleById: (id) => {
        return new Promise((resolve, reject) => {
            if (!id) {
                reject('找不到文章,文章可能已被删除');
                return;
            }
            ArticleModel.findById(id, (err, article) => {
                if (err) {
                    reject('找不到文章,文章可能已被删除');
                    return;
                }
                resolve(article)
            });


        })
    },
    //根据Id删除某篇文章
    deleteArticleById: (id) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (!id) {
                reject('找不到文章（参数id错误）');
                return;
            }
            ArticleModel.remove({ _id: id }, (err) => {
                if (err) {
                    reject('删除文章失败');
                    return;
                }
                resolve('删除成功！')
            });


        })
    },
    //根据ID修改文章
    updateOneArticle: (newArticle) => {
        return new Promise((resolve, reject) => {
            if (!newArticle._id) {
                reject('找不到文章（参数id错误）');
            }
            ArticleModel.findById(newArticle._id, (err, article) => {
                if (err) {
                    reject('找不到文章');
                    return;
                }
                article.title = newArticle.title;
                article.content = newArticle.content;
                article.tags = newArticle.tags;
                article.save((err) => {
                    if (err) {
                        reject('更新文章失败');
                        return;
                    }
                    resolve('更新文章成功');
                })
            })
        })
    },
    //根据标签查找所有文章
    findAllArticlesByTags: (type, limit = null, skip = 0) => {
        return new Promise((resolve, reject) => {
            if (!type) {
                reject('找不到标签（参数"type"错误）');
                return;
            }
            let query = {
                tags: type
            };
            ArticleModel.find(query, null, { sort: { '_id': -1 } }, (err, articles) => {
                if (err) {
                    reject('找不到标签');
                    return;
                }
                resolve(articles)
            }).limit(limit).skip(skip);
        })
    },
}

export default articles