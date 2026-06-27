const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
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

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashOtp(otp) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

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
  const otp = generateOtp();

  req.session.pendingSignup = {
    userData: req.body,
    otpHash: hashOtp(otp),
    expiresAt: Date.now() + 5 * 60 * 1000
  };

 
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: req.body.email,
    subject: "Your CollegeBuzz OTP",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`
  });

  req.flash("success", "OTP sent to your email.");
  res.redirect("/index/user/verify-otp");
});

//otp verfiy page render
router.get("/verify-otp", (req, res) => {
  res.render("user/verifyOtp.ejs");
});

//otp verfiy page render for admin
router.get("/verify-otp/admin", (req, res) => {
  res.render("user/verifyOtpadmin.ejs");
});

//otp verfication

router.post("/verify-otp", async (req, res, next) => {
  const pending = req.session.pendingSignup;

  if (!pending) {
    req.flash("error", "Signup session expired. Please signup again.");
    return res.redirect("/index/user/signup");
  }

  if (Date.now() > pending.expiresAt) {
    req.session.pendingSignup = null;
    req.flash("error", "OTP expired. Please signup again.");
    return res.redirect("/index/user/signup");
  }

  if (hashOtp(req.body.otp) !== pending.otpHash) {
    req.flash("error", "Invalid OTP.");
    return res.redirect("/index/user/verify-otp");
  }

  const { username, mobile, password, name, email,id_admin  } = pending.userData;

  const newuser = new User({ username, mobile, name, email, id_admin });
  const registeredUser = await User.register(newuser, password);

  req.session.pendingSignup = null;

  req.login(registeredUser, (err) => {
    if (err) return next(err);
    req.flash("success", "Signup verified successfully.");
    res.redirect("/index");
  });
});

//otp verfication for admin

router.post("/verify-otp/admin", async (req, res, next) => {
  const pending = req.session.pendingSignup;

  if (!pending) {
    req.flash("error", "Signup session expired. Please signup again.");
    return res.redirect("/index/user/signup");
  }

  if (Date.now() > pending.expiresAt) {
    req.session.pendingSignup = null;
    req.flash("error", "OTP expired. Please signup again.");
    return res.redirect("/index/user/signup");
  }

  if (hashOtp(req.body.otp) !== pending.otpHash) {
    req.flash("error", "Invalid OTP.");
    return res.redirect("/index/user/verify-otp");
  }

  const { username, mobile, password, name, email,id_admin  } = pending.userData;

  const newuser = new User({ username, mobile, name, email, id_admin });
  const registeredUser = await User.register(newuser, password);

  req.session.pendingSignup = null;

  req.login(registeredUser, (err) => {
    if (err) return next(err);
    req.flash("success", "Signup verified successfully.");
    res.redirect("/index");
  });
});

//signup admin
router.post("/signup/admin", async (req,res,next)=>{
    const otp = generateOtp();

  req.session.pendingSignup = {
    userData: req.body,
    otpHash: hashOtp(otp),
    expiresAt: Date.now() + 5 * 60 * 1000
  };

 
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: req.body.email,
    subject: "Your CollegeBuzz OTP",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`
  });

  req.flash("success", "OTP sent to your email.");
  res.redirect("/index/user/verify-otp/admin");
    
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