import { GameModel } from '../lib/mongo';

const games = {
    //上传一个游戏
    createGames: (game) => {
        return new Promise((resolve, reject) => {
            var oneGame = new GameModel(game);
            oneGame.save((err) => {
                if (err) {
                    reject('上传游戏失败');
                    return;
                }
                resolve('上传游戏成功');
            });
        })
    },
    //查询所有游戏/查询某个用户所有游戏（如果有传参数name）
    findAllGames: (name = 'all', limit = null, skip = 0) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (name && name != 'all') {
                query.author = name;
            }
            GameModel.find(query, null, { sort: { '_id': -1 } }, (err, games) => {
                if (err) {
                    reject('找不到游戏');
                    return;
                }
                resolve(games)
            }).limit(limit).skip(skip);


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
                reject('找不到游戏（参数id错误）');
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
                reject('找不到游戏（参数id错误）');
            }
            GameModel.findById(newGame._id, (err, game) => {
                if (err) {
                    reject('找不到游戏');
                    return;
                }
                game.title = newGame.title;
                game.content = newGame.content;
                game.url = newGame.url;
                game.bgImg = newGame.bgImg;
                game.save((err) => {
                    if (err) {
                        reject('修改游戏失败');
                        return;
                    }
                    resolve('更新游戏成功');
                })
            })
        })
    }
}

export default games