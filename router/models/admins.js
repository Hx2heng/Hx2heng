import { AdminModel } from '../lib/mongo';

const admins = {
    //根据用户名获取用户对象
    getAdminByName: (name) => {
        return new Promise((resolve, reject) => {
            AdminModel.findOne({ name: name }, (err, admin) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(admin)
                }
            })
        })
    },
    //查询所有文章标签/查询特定用户的所有文章标签
    findAllArticleTagsByAdmin: (admin) => {
        return new Promise((resolve, reject) => {
            var query = {};
            if (admin) {
                query.name = admin;
            }
            AdminModel.find(query, (err, models) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (models.length == 1) {
                    resolve(models[0].articleTags);
                }
                resolve(models);
            });
        })
    },
    //根据特定用户添加文章标签
    addArtcleTagsByAdmin: (admin, newTag) => {
        return new Promise((resolve, reject) => {
            if (!admin || !newTag) {
                reject(new Error('参数错误'));
                return;
            }
            AdminModel.findOne({ name: admin }, (err, models) => {
                if (err) {
                    reject(err);
                    return;
                }
                //判断是否存在标签
                let isExist = false;
                models.articleTags.map((tag) => {
                    if (tag == newTag) {
                        reject('已存在的标签');
                        isExist = true;
                        return;
                    }
                })
                if (!isExist) {
                    models.articleTags.push(newTag);
                    models.save((err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve('添加标签成功');
                    })
                }

            })
        })
    },
    //根据特定用户删除文章标签
    delArtcleTagsByAdmin: (admin, tags) => {
        return new Promise((resolve, reject) => {
            if (!admin || !tags) {
                reject(new Error('参数错误'));
                return;
            }
            AdminModel.update({ name: admin }, { '$pullAll': { 'articleTags': tags } }, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve('删除标签成功！');
            });

        })
    }
}

export default admins