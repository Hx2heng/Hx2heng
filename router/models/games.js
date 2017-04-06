import { GameModel } from '../lib/mongo';

const games = {
    //上传一个游戏
    createGames: (game) => {
        return new Promise((resolve, reject) => {
            var oneGame = new GameModel(game);
            oneGame.save((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('插入成功');
            });
        })
    },
    //查询所有游戏/查询某个用户所有游戏（如果有传参数name）
    findAllGames: (name) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (name) {
                query.author = name;
            }
            GameModel.find(query, null, { sort: { '_id': -1 } }, (err, games) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(games)
            });


        })
    },
    //根据Id查询某个游戏
    findGameById: (id) => {
        return new Promise((resolve, reject) => {
            if (!id) {
                reject('游戏已被删除');
                return;
            }
            GameModel.findById(id, (err, game) => {
                if (err) {
                    reject('找不到游戏');
                    return;
                }
                resolve(game)
            });


        })
    },
    //根据Id删除某个游戏
    deleteGameById: (id) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (!id) {
                reject(new Error('缺少_id'));
                return;
            }
            GameModel.remove({ _id: id }, (err) => {
                if (err) {
                    reject('删除失败');
                    return;
                }
                resolve('删除成功！')
            });


        })
    },
    //根据ID修改游戏
    updateOneGame: (newGame) => {
        return new Promise((resolve, reject) => {
            if (!newGame._id) {
                reject(new Error('缺少_id'));
            }
            GameModel.findById(newGame._id, (err, game) => {
                if (err) {
                    reject(err);
                    return;
                }
                game.title = newGame.title;
                game.content = newGame.content;
                game.url = newGame.url;
                game.save((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve('更新游戏成功');
                })
            })
        })
    }
}

export default games