const mongoose= require("mongoose");
const schema=mongoose.Schema;
const User= require("./user");
const Scndpur=require("../models/scndpur");
const secondhandSchema= schema({
    productName:{
        type:String,
        required:true,
    },
    purchase:[{
         type:schema.Types.ObjectId, ref:"Scndpur",
    }],
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    },

    originalPrice:{
        type:Number,
         required:true,
    },

    sellingPrice:{
        type:Number,
        required:true,
    },

    productCondition:{
        type:String,
        required:true,
    },
    
   description:{
      type:String,
      required:true,
    },

    productPurchaseDate:{
        type:String,
    },

    productExpiryDate:{
        type:String,
    }
,
    imageUrl:{
        type:String,
        required:true,
    },
     createdAt:{
        type:Date,
        default:  Date.now(),
    },
    
})

const Secondhand = mongoose.model("Secondhand",secondhandSchema);

module.exports=Secondhand;