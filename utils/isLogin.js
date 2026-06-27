async function isLogin (req,res,next){
if(req.isAuthenticated()){
    next();
}else{
    req.flash("error","Please login to move further.");
    res.redirect("/index/user/login");
}
}

module.exports= isLogin;