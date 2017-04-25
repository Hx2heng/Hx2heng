let checkLogin = (req, res, next) => {
    if (!req.session.admin) {
        req.flash('error', '您还未登录，请登录');
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