import config from 'config-lite'
import mongoose from 'mongoose'
var db = mongoose.createConnection(config.mongodb);
db.on('error', function(error) {
    console.log('Database err:' + error);
});
db.once('open', function() {
    console.log('open database.');
});

var AdminSchema = new mongoose.Schema({
    name: String,
    password: String
})
var AdminModel = db.model('admins', AdminSchema);

var ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags: Array,
    author: String
})
var ArticleModel = db.model('articles', ArticleSchema);

export { AdminModel, ArticleModel }