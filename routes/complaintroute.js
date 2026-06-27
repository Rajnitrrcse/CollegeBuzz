const express= require("express");
const Complaint= require("../models/complaint");
const router= express.Router()
const wrapAsync=require("../utils/wrapAsync");
const expressError= require("../utils/expressError");
const User=require("../models/user");
const isLogin= require("../utils/isLogin")

//complaint main page render
router.get("/",isLogin,wrapAsync(async (req,res)=>{
   let complaints= await Complaint.find({})
    res.render("complaint/index.ejs",{complaints});
}))


//new complaint form render
router.get("/new",isLogin,wrapAsync(async (req,res)=>{
    res.render("complaint/new.ejs");
}))

//show particular complaint
router.get("/:id",isLogin,wrapAsync(async (req,res)=>{
       let {id}= req.params;
       let complaint= await Complaint.findById(id).populate("owner");
       res.render("complaint/show.ejs",{complaint});
}))

//delete particular complaint
router.delete("/:id",isLogin,wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let complaint= await Complaint.findByIdAndDelete(id);
    console.log("deleted");
    res.redirect("/index/complaint");
}))

//edit form render
router.get("/:id/edit",isLogin,wrapAsync(
    async (req,res)=>{
  let {id}= req.params;
       let complaint= await Complaint.findById(id);
    res.render("complaint/edit.ejs" ,{complaint});
}
))

//new complaint added
router.post("/",isLogin,wrapAsync(async (req,res)=>{
    let {details,opposite_party_details,facts,
        specifics,relief,contact,}=req.body;
    let complaint= new Complaint({
        details:details,
        opposite_party_details:opposite_party_details,
        facts:facts,
        specifics:specifics,
        relief:relief,
        contact:contact,
        owner:req.user._id,
    })
   await complaint.save();
   res.redirect("/index/complaint");
}))

//update complaint info
router.put("/:id",isLogin,wrapAsync(
    async (req,res)=>{
     let {id}= req.params;
    let {details,opposite_party_details,facts,
        specifics,relief,contact
        ,}=req.body;
       let complaint= await Complaint.findByIdAndUpdate(id,{
        details:details,
        opposite_party_details:opposite_party_details,
        facts:facts,
        owner:req.user._id,
        specifics:specifics,
          relief:relief,
        contact:contact,
    });
    res.redirect("/index/complaint");
}
))


module.exports=router;