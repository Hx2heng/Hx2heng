let checkLogin = (req, res, next) => {
    if (!req.session.admin) {
        req.flash('error', '未登录');
        return res.redirect('/signin');
    }
    next();
}


let checkNotLogin = (req, res, next) => {
    if (req.session.admin) {
        req.flash('success', '已登录');
        return res.redirect('./signin')
    }
    next();
}
export { checkLogin, checkNotLogin }