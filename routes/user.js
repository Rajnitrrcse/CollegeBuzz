const User=require("../models/user");
const express= require("express");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync");
const expressError= require("../utils/expressError");
const passport= require("passport");
const isLogin= require("../utils/isLogin");
const multer  = require('multer')
const {storage} = require("../cloudconfig");
const upload = multer({ storage })



//signup page render
router.get("/signup",async (req,res)=>{
   res.render("user/signup.ejs");
})



//signup page render for admin
router.get("/signup/admin",async (req,res)=>{
   res.render("user/adminsignup.ejs");
})


//signup
router.post("/signup", async (req, res, next) => {
   const { username, mobile, password, name, email,id_admin  } =req.body;

  const newuser = new User({ username, mobile, name, email, id_admin });
  const registeredUser = await User.register(newuser, password);
req.login(registeredUser,(err)=>{
  if(err){
    next(err);
  }else{
    req.flash("success","Welecome to Collezebuzz..");
  res.redirect("/index");
  }
 })  

});






//signup admin
router.post("/signup/admin", async (req,res,next)=>{
    const { username, mobile, password, name, email,id_admin  } =req.body;

  const newuser = new User({ username, mobile, name, email, id_admin });
  const registeredUser = await User.register(newuser, password);
req.login(registeredUser,(err)=>{
  if(err){
    next(err);
  }else{
    req.flash("success","Welecome to Collezebuzz..");
  res.redirect("/index");
  }
 })  
    
})




//login page render
router.get("/login",async (req,res)=>{
    res.render("user/login.ejs");
})

//login page render for admin
router.get("/login/admin",async (req,res)=>{
    res.render("user/adminlogin.ejs");
})


//login
router.post("/login",passport.authenticate("local",{
    failureRedirect:"/index/user/login",
    failureFlash:true,
}),
 async (req,res)=>{
    req.flash("success","Congratulation!! you have Login to collezeBuzz");
    res.redirect("/index");
})


//login admin
router.post("/login/admin",passport.authenticate("local",{
    failureRedirect:"/index",
    failureFlash:true,
}),
 async (req,res)=>{
    req.flash("success","Congratulation!! you have Login to collezeBuzz");
    res.redirect("/index");
})




//logout
router.get("/logout",isLogin, async (req,res,next)=>{
    req.logout((err)=>{
         if(err){
            next(err);
         }
         req.flash("success","You have Logout Sucessfully!!");
         res.redirect("/index");
    })
})



module.exports=router;