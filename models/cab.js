 const mongoose= require("mongoose");
 const User= require("./user");
const schema=mongoose.Schema;
const Cabbook=require("../models/cabbook");


const cabSchema= schema({
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    },
    vehicleCompanies:{
        type:String,
        enum:["Ola","Rapido","Uber","Namma Yatri","BluSmart","Quick Ride"],
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    from:{
       type:String,
         required:true,
    },
     to:{
       type:String,
         required:true,
    },
    departureTime:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        default:"https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    requiredPerson:{
        type:Number,
        required:true,
    },
    vehicleType:{
        type:String,
        required:true,
    },
    book:[{
        type:schema.Types.ObjectId,
        ref:"Cabbook"
    }],

})

const Cab = mongoose.model("Cab",cabSchema);

module.exports=Cab;