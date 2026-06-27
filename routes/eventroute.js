const express= require("express");
const Event= require("../models/event");
const router= express.Router()
const wrapAsync=require("../utils/wrapAsync");
const expressError= require("../utils/expressError");
const User=require("../models/user");
const isLogin= require("../utils/isLogin")
const multer  = require('multer')
const {storage} = require("../cloudconfig");
const upload = multer({ storage });
const Eventreg=require("../models/eventreg");

//event main page render
router.get("/",wrapAsync(async (req,res)=>{
   let events= await Event.find({})
    res.render("event/index.ejs",{events});
}))


//new event form render
router.get("/new",isLogin,wrapAsync(async (req,res)=>{
    res.render("event/new.ejs");
}))

//show particular event
router.get("/:id",isLogin,wrapAsync(async (req,res)=>{
       let {id}= req.params;
       let event= await Event.findById(id).populate("owner");
       res.render("event/show.ejs",{event});
}))

//delete particular event
router.delete("/:id",isLogin,wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let event= await Event.findByIdAndDelete(id);
    console.log("deleted");
    res.redirect("/index/event");
}))

//edit form render
router.get("/:id/edit",isLogin,wrapAsync(async (req,res)=>{
  let {id}= req.params;
       let event= await Event.findById(id);
       let url=event.imageUrl;
       url=url.replace("/upload","/upload/h_300,w_250");
    res.render("event/edit.ejs" ,{event,url});
}))

//new event added
router.post("/",upload.single('imageUrl'),isLogin,wrapAsync(async (req,res)=>{
    let {eventName,description,title,
        Location,eventDate,eventTime}=req.body;
        let {filename,path}=req.file;
    let event= new Event({
        eventName:eventName,
        description:description,
        title:title,
        imageUrl:path,
        Location:Location,
              owner:req.user._id,
        eventDate:eventDate,
        eventTime:eventTime,
    })
   await event.save();
   res.redirect("/index/event");
}))

//update event info
router.put("/:id",upload.single('imageUrl'),isLogin,wrapAsync(
    async (req,res)=>{
     let {id}= req.params;
    let {eventName,description,title,
        Location,eventDate
        ,eventTime}=req.body;
         let {filename,path}=req.file;
       let event= await Event.findByIdAndUpdate(id,{
        eventName:eventName,
        description:description,
        title:title,
        imageUrl:path,
              owner:req.user._id,
          Location:Location,
        eventDate:eventDate,
        eventTime:eventTime,
    });
    res.redirect("/index/event");
}
))

//register form render
router.get("/:id/register",wrapAsync(async (req,res,next)=>{
    let {id}=req.params;
    let eventid=id;
    res.render("eventreg/new.ejs",{eventid});
}))

router.post("/:id/register",wrapAsync(async (req,res,next)=>{
    let {name,email,mobile,year,branch,roll}=req.body;
    let {id}=req.params;
    let event= await  Event.findById(id);
    let eventreg= new Eventreg({
        name:name,
        email:email,
        mobile:mobile,
        year:year,
        branch:branch,
        roll:roll,
    })
   await eventreg.save();
    event.registereduser.push(eventreg);
    await event.save();
    req.flash("success","Response has sucessfully recorded");
    res.redirect(`/index/event/${id}`);
}));

router.get("/:id/show",wrapAsync(async(req,res,next)=>{
     let {id}=req.params;
     let event=await Event.findById(id).populate("registereduser");

     if(event.registereduser.length>0)
     res.render("eventreg/show.ejs",{event});
    else{
        req.flash("success","No one has registerd yet");
        res.redirect(`/index/event/${id}`);
    }


}))

module.exports=router;