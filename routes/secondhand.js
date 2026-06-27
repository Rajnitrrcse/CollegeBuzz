const express= require("express");
const Secondhand= require("../models/secondHand");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync");
const expressError= require("../utils/expressError");
const User=require("../models/user");
const isLogin= require("../utils/isLogin")
const multer  = require('multer')
const {storage} = require("../cloudconfig");
const upload = multer({ storage })
const Scndpur= require("../models/scndpur");
//secondhand main page render
router.get("/",wrapAsync(async (req,res)=>{
   let secondhands= await Secondhand.find({})
    res.render("secondhand/index.ejs",{secondhands});
}))


//new secondhand form render
router.get("/new",isLogin,wrapAsync(async (req,res)=>{
    res.render("secondhand/new.ejs");
}))

//show particular secondhand
router.get("/:id",isLogin,wrapAsync(async (req,res)=>{
       let {id}= req.params;
       let secondhand= await Secondhand.findById(id).populate("owner");
       res.render("secondhand/show.ejs",{secondhand});
}))

//delete particular secondhand
router.delete("/:id",isLogin,wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let secondhand= await Secondhand.findByIdAndDelete(id);
    res.redirect("/index/secondhand");
}))

//edit form render
router.get("/:id/edit",isLogin,wrapAsync(async (req,res)=>{
  let {id}= req.params;
       let secondhand= await Secondhand.findById(id);
       let url=secondhand.imageUrl;
       url=url.replace("/upload","/upload/h_300,w_250");
    res.render("secondhand/edit.ejs" ,{secondhand,url});
}))

//new secondhand added
router.post("/",upload.single('imageUrl'),isLogin,wrapAsync(async (req,res)=>{
    let {productName,description,originalPrice,
        sellingPrice,productPurchaseDate,productCondition,productExpiryDate}=req.body;
            let {filename,path}=req.file;
    let secondhand= new Secondhand({
        productName:productName,
        description:description,
        originalPrice:originalPrice,
       imageUrl:path,
        sellingPrice:sellingPrice,
        productCondition:productCondition,
        productPurchaseDate:productPurchaseDate,
        productExpiryDate:productExpiryDate,
         owner:req.user._id,
    })
   await secondhand.save();
   res.redirect("/index/secondhand");
}))

//update secondhand info
router.put("/:id",upload.single('imageUrl'),isLogin,wrapAsync(async (req,res)=>{
     let {id}= req.params;
    let {productName,description,originalPrice,
        sellingPrice,productCondition
        ,productPurchaseDate,productExpiryDate}=req.body;
          let {filename,path}=req.file;
       let secondhand= await Secondhand.findByIdAndUpdate(id,{
        productName:productName,
        description:description,
        originalPrice:originalPrice,
        imageUrl:path,
          sellingPrice:sellingPrice,
        productPurchaseDate:productPurchaseDate,
        productCondition:productCondition,
        productExpiryDate:productExpiryDate,
         owner:req.user._id,
    });
    res.redirect("/index/secondhand");
}))


//register form render
router.get("/:id/purchase",wrapAsync(async (req,res,next)=>{
    let {id}=req.params;
    let secondhandid=id;
    res.render("scndpur/new.ejs",{secondhandid});
}))

router.post("/:id/purchase",wrapAsync(async (req,res,next)=>{
    let {name,email,mobile,year,branch,roll,description}=req.body;
    let {id}=req.params;
    let secondhand= await  Secondhand.findById(id);
    let scndpur= new Scndpur({
        name:name,
        email:email,
        mobile:mobile,
        year:year,
        branch:branch,
        roll:roll,
        description:description,
    })
   await scndpur.save();
    secondhand.purchase.push(scndpur);
    await secondhand.save();
    req.flash("success","Response has sucessfully recorded, you will be contacted soon!");
    res.redirect(`/index/secondhand/${id}`);
}));

router.get("/:id/show",wrapAsync(async(req,res,next)=>{
     let {id}=req.params;
     let secondhand=await Secondhand.findById(id).populate("purchase");

     if(secondhand.purchase.length>0)
     res.render("scndpur/show.ejs",{secondhand});
    else{
        req.flash("success","No one has registerd yet for purchase");
        res.redirect(`/index/secondhand/${id}`);
    }


}))


module.exports=router;