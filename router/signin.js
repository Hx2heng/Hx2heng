import express from 'express'
import sha1 from 'sha1'
import config from 'config-lite'
import mongoose from 'mongoose'

let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', (req, res) => {
    res.render('signin', { messages: req.flash('info') });
})

router.post('/', (req, res, next) => {

    var name = req.body.name;
    var password = req.body.password;
    var db = mongoose.createConnection(config.mongodb);
    db.on('error', function(error) {
        console.log(error);
    });
    db.once('open', function() {
        console.log('open');
    });

    var UserSchema = mongoose.Schema({
        name: String,
        password: String
    })
    var UserModel = db.model('admin', UserSchema);
    // UserEntity.save();
    UserModel.find(function(err, persons) {
        console.log(persons);
    });
    console.log(sha1(password));
    // userModel.getUserByName(name)
    //     .then((user) => {
    //         console.log(user)
    //     })


})
export default router