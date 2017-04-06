import config from 'config-lite'
import mongoose from 'mongoose'

var db = mongoose.createConnection(config.mongodb);
db.on('error', function(error) {
    console.log('Database err:' + error);
});
db.once('open', function() {
    console.log('open database.');
});
//管理员
var AdminSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    password: String,
    articleTags: Array
})
var AdminModel = db.model('admins', AdminSchema);
//文章
var ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags: Array,
    author: String,
    pv: Number,
    createDate: String,
    createTime: String,
    updateDate: String
})
var ArticleModel = db.model('articles', ArticleSchema);
//游戏
var GameSchema = new mongoose.Schema({
    title: String,
    content: String,
    url: String,
    author: String,
    pv: Number,
    createDate: String,
    createTime: String,
    updateDate: String
})
var GameModel = db.model('games', GameSchema);
export { AdminModel, ArticleModel, GameModel }