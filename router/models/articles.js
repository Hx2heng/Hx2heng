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
    findAllArticle: (name) => {
        return new Promise((resolve, reject) => {
            if (name) {
                ArticleModel.find({ author: name }, (err, articles) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(articles)
                });
            } else {
                ArticleModel.find({}, (err, articles) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(articles)
                });
            }

        })
    }
}

export default articles