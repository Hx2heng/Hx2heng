import express from 'express'
import sha1 from 'sha1'
import config from 'config-lite'
import mongoose from 'mongoose'
import AdminsModel from './models/admins'

let router = express.Router();

router.use((req, res, next) => {
    next();
})
router.get('/', (req, res) => {
    if (req.session.admin) {
        res.redirect('/admin');
    } else {
        let defaultNameValue = '';
        let defaultPasswordValue = '';
        if (req.cookies.defaultInputValue) {
            defaultNameValue = req.cookies.defaultInputValue.defaultNameValue;
            defaultPasswordValue = req.cookies.defaultInputValue.defaultPasswordValue;
        }
        req.flash('error', '请登录');
        res.render('signin', { defaultNameValue: defaultNameValue, defaultPasswordValue: defaultPasswordValue })
    }
})

router.post('/', (req, res, next) => {

    var name = req.body.name;
    var password = req.body.password;
    var isRemember = req.body.isRemember;
    console.log(sha1(password));
    AdminsModel.getAdminByName(name).then((admin) => {
        if (!admin) {
            req.flash('error', '用户不存在');
            res.redirect('back');
        } else if (admin.password != sha1(password)) {
            req.flash('error', '密码错误');
            res.redirect('back');
        } else {
            req.flash('success', '登录成功');
            //设置session
            delete admin.password;
            req.session.admin = admin;
            //设置记住密码
            if (isRemember != 'undefined') {
                res.cookie('defaultInputValue', { defaultNameValue: name, defaultPasswordValue: password }, { expires: new Date(Date.now() + 900000), httpOnly: true });
            }
            res.redirect('/admin');
        }
    }).catch((err) => {
        req.flash('error', '网络超时请重试')
    })



})
export default router