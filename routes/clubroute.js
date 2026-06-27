const express= require("express");
const Club= require("../models/club");
const router= express.Router()
const wrapAsync=require("../utils/wrapAsync");
const expressError= require("../utils/expressError");
const User=require("../models/user");
const isLogin= require("../utils/isLogin")
const multer  = require('multer')
const {storage} = require("../cloudconfig");
const upload = multer({ storage })
//club main page render
router.get("/",wrapAsync(async (req,res)=>{
   let clubs= await Club.find({})
    res.render("club/clubindex.ejs",{clubs});
}))

//new club form render
router.get("/new",isLogin,wrapAsync(async (req,res)=>{
    res.render("club/new.ejs");
}))

//show particular club
router.get("/:id",isLogin,wrapAsync(
    async (req,res)=>{
       let {id}= req.params;
       let club= await Club.findById(id).populate("owner");
       res.render("club/clubshow.ejs",{club});
}
))

//delete particular club
router.delete("/:id",isLogin,wrapAsync(
    async(req,res)=>{
    let {id}= req.params;
    let club= await Club.findByIdAndDelete(id);
    console.log("deleted");
    res.redirect("/index/club");
}
))

//edit form render
router.get("/:id/edit",isLogin,wrapAsync(async (req,res)=>{
  let {id}= req.params;
       let club= await Club.findById(id);
       let url=club.imageUrl;
       url=url.replace("/upload","/upload/h_300,w_250");
    res.render("club/edit.ejs" ,{club,url});
}))

//new club added
router.post("/",upload.single('imageUrl'),isLogin,wrapAsync(async (req,res)=>{
    let {clubName,description,title}=req.body;
     let {filename,path}=req.file;
    let club= new Club({
        clubName:clubName,
        description:description,
        title:title,
       imageUrl:path,
        owner:req.user._id,
    })
   await club.save();
   res.redirect("/index/club");
}))

//update club info
router.put("/:id",upload.single('imageUrl'),isLogin,wrapAsync(async (req,res)=>{
     let {id}= req.params;
    let {clubName,description,title}=req.body;
     let {filename,path}=req.file;
       let club= await Club.findByIdAndUpdate(id,{
        clubName:clubName,
        description:description,
        title:title,
        imageUrl:path,
        owner:req.user._id,
    });
    res.redirect("/index/club");
}))

module.exports=router;