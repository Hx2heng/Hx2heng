import { ArticleModel } from '../lib/mongo';

const articles = {
    //上传一篇文章
    createArticles: (article) => {
        return new Promise((resolve, reject) => {
            var oneArticle = new ArticleModel(article);
            oneArticle.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve('插入成功');
            });
        })
    },
    //查询所有文章/查询某个用户所有文章（如果有传参数name）
    findAllArticles: (name) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (name) {
                query.author = name;
            }
            ArticleModel.find(query, null, { sort: { '_id': -1 } }, (err, articles) => {
                if (err) {
                    reject(err);
                }
                resolve(articles)
            });


        })
    },
    //根据Id查询某篇文章
    findArticleById: (id) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (!id) {
                reject(new Error('缺少_id'));
            }
            ArticleModel.findById(id, (err, article) => {
                if (err) {
                    reject(err);
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
                reject(new Error('缺少_id'));
            }
            ArticleModel.remove({ _id: id }, (err) => {
                if (err) {
                    reject(err);
                }
                resolve('删除成功！')
            });


        })
    },
    //根据ID修改文章
    updateOneArticle: (newArticle) => {
        return new Promise((resolve, reject) => {
            if (!newArticle._id) {
                reject(new Error('缺少_id'));
            }
            ArticleModel.findById(newArticle._id, (err, article) => {
                if (err) {
                    reject(err);
                }
                article.title = newArticle.title;
                article.content = newArticle.content;
                article.tags = newArticle.tags;
                article.save((err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve('更新文章成功');
                })
            })
        })
    }
}

export default articles