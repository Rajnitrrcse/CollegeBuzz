const express= require("express");
const Cab= require("../models/cab");
const router= express.Router()
const wrapAsync=require("../utils/wrapAsync");
const expressError= require("../utils/expressError");
const User=require("../models/user");
const isLogin= require("../utils/isLogin");
const Cabbook=require("../models/cabbook");
//cab main page render
router.get("/",wrapAsync(async (req,res)=>{
   let cabs= await Cab.find({})
    res.render("cab/index.ejs",{cabs});
}));


//new cab form render
router.get("/new",isLogin,wrapAsync(
    async (req,res)=>{
    res.render("cab/new.ejs");
}
))

//show particular cab
router.get("/:id",isLogin,wrapAsync(async (req,res)=>{
       let {id}= req.params;
       let cab= await Cab.findById(id).populate("owner");
       res.render("cab/show.ejs",{cab});
}))

//delete particular cab
router.delete("/:id",isLogin,wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let cab= await Cab.findByIdAndDelete(id);
    console.log("deleted");
    res.redirect("/index/cab");
}))

//edit form render
router.get("/:id/edit",isLogin,wrapAsync(
    async (req,res)=>{
  let {id}= req.params;
       let cab= await Cab.findById(id);
    res.render("cab/edit.ejs" ,{cab});
}
))

//new cab added
router.post("/",isLogin,wrapAsync(async (req,res)=>{
    let {vehicleCompanies,totalPrice,from,
        to,departureTime,requiredPerson,vehicleType}=req.body;
    let cab= new Cab({
        vehicleCompanies:vehicleCompanies,
        totalPrice:totalPrice,
        from:from,
        to:to,
        departureTime:departureTime,
        requiredPerson:requiredPerson,
        vehicleType:vehicleType,
        owner:req.user._id,
    })
   await cab.save();
   res.redirect("/index/cab");
}))

//update cab info
router.put("/:id",isLogin,wrapAsync(async (req,res)=>{
     let {id}= req.params;
    let {vehicleCompanies,totalPrice,from,
        to,departureTime,requiredPerson
        ,vehicleType}=req.body;
       let cab= await Cab.findByIdAndUpdate(id,{
        vehicleCompanies:vehicleCompanies,
        totalPrice:totalPrice,
        from:from,
        to:to,
          departureTime:departureTime,
        requiredPerson:requiredPerson,
        vehicleType:vehicleType,
         owner:req.user._id,
    });
    res.redirect("/index/cab");
}))


//claim form render
router.get("/:id/book",wrapAsync(async (req,res,next)=>{
    let {id}=req.params;
    let cabid=id;
    res.render("cabook/new.ejs",{cabid});
}))

router.post("/:id/book",wrapAsync(async (req,res,next)=>{
    let {name,email,mobile,year,branch,roll,description}=req.body;
    let {id}=req.params;
    let cab= await  Cab.findById(id);
    let cabbook= new Cabbook({
        name:name,
        email:email,
        mobile:mobile,
        year:year,
        branch:branch,
        roll:roll,    
        description:description,
    })
   await cabbook.save();
    cab.book.push(cabbook);
    await cab.save();
    req.flash("success","Booking request has sent sucessfully");
    res.redirect(`/index/cab/${id}`);
}));

router.get("/:id/show",wrapAsync(async(req,res,next)=>{
     let {id}=req.params;
     let cab=await Cab.findById(id).populate("book");

     if(cab.book.length>0)
     res.render("cabook/show.ejs",{cab});
    else{
        req.flash("success","No one has request for booking");
        res.redirect(`/index/cab/${id}`);
    }


}))



module.exports=router;