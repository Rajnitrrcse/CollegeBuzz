const express= require("express");
const Lostfound= require("../models/lostfound");
const router= express.Router()
const wrapAsync=require("../utils/wrapAsync");
const expressError= require("../utils/expressError");
const User=require("../models/user");
const isLogin= require("../utils/isLogin")
const multer  = require('multer')
const {storage} = require("../cloudconfig");
const upload = multer({ storage })
const Lostclaim= require("../models/lostclaim");
//lostfound main page render
router.get("/",wrapAsync(async (req,res)=>{
   let lostfounds= await Lostfound.find({})
    res.render("lostfound/index.ejs",{lostfounds});
}))


//new lostfound form render
router.get("/new",isLogin,wrapAsync(async (req,res)=>{
    res.render("lostfound/new.ejs");
}))

//show particular lostfound
router.get("/:id",isLogin,wrapAsync(async (req,res)=>{
       let {id}= req.params;
       let lostfound= await Lostfound.findById(id).populate("owner");
       res.render("lostfound/show.ejs",{lostfound});
}))

//delete particular lostfound
router.delete("/:id",isLogin,wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let lostfound= await Lostfound.findByIdAndDelete(id);
    console.log("deleted");
    res.redirect("/index/lostfound");
}))

//edit form render
router.get("/:id/edit",isLogin,wrapAsync(async (req,res)=>{
  let {id}= req.params;
       let lostfound= await Lostfound.findById(id);
       let url=lostfound.imageUrl;
       url=url.replace("/upload","/upload/h_300,w_250");
    res.render("lostfound/edit.ejs" ,{lostfound,url});
}))

//new lostfound added
router.post("/",upload.single('imageUrl'),isLogin,wrapAsync(async (req,res)=>{
    let {description,title,
        foundAt}=req.body;
          let {filename,path}=req.file;
    let lostfound= new Lostfound({
        description:description,
        title:title,
        imageUrl:path,
        foundAt:foundAt,
         owner:req.user._id,
    })
   await lostfound.save();
   res.redirect("/index/lostfound");
}))

//update lostfound info
router.put("/:id",upload.single('imageUrl'),isLogin,wrapAsync(async (req,res)=>{
     let {id}= req.params;
   let {description,title,
        foundAt}=req.body;
          let {filename,path}=req.file;
       let lostfound= await Lostfound.findByIdAndUpdate(id,{
         description:description,
        title:title,
        imageUrl:path,
        foundAt:foundAt,
         owner:req.user._id,
    });
    res.redirect("/index/lostfound");
}))

//claim form render
router.get("/:id/claim",wrapAsync(async (req,res,next)=>{
    let {id}=req.params;
    let lostfoundid=id;
    res.render("lostclaim/new.ejs",{lostfoundid});
}))

router.post("/:id/claim",wrapAsync(async (req,res,next)=>{
    let {name,email,mobile,year,branch,roll,description}=req.body;
    let {id}=req.params;
    let lostfound= await  Lostfound.findById(id);
    let lostclaim= new Lostclaim({
        name:name,
        email:email,
        mobile:mobile,
        year:year,
        branch:branch,
        roll:roll,
        description:description,
    })
   await lostclaim.save();
    lostfound.claim.push(lostclaim);
    await lostfound.save();
    req.flash("success","Claim has sucessfully recorded");
    res.redirect(`/index/lostfound/${id}`);
}));

router.get("/:id/show",wrapAsync(async(req,res,next)=>{
     let {id}=req.params;
     let lostfound=await Lostfound.findById(id).populate("claim");

     if(lostfound.claim.length>0)
     res.render("lostclaim/show.ejs",{lostfound});
    else{
        req.flash("success","No one has claimd yet");
        res.redirect(`/index/lostfound/${id}`);
    }


}))




module.exports=router;