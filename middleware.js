module.exports.isLoggedIn = (req, res, next) => {
 // console.log("REQ.USER...", req.user);
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originaUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}