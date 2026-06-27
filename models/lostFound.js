const mongoose= require("mongoose");
const schema=mongoose.Schema;
const User= require("./user");
const Lostclaim=require("../models/lostclaim");
const lostfoundSchema= schema({
     owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
         required:true,
    },
    description:{
      type:String,
    },
    imageUrl:{
        type:String,
        required:true,
    },
     createdAt:{
        type:Date,
        default:  Date.now(),
    },
    foundAt:{
        type:String,
        required:true,
    },
    claim:[{
        type:schema.Types.ObjectId,
        ref:"Lostclaim"
    }],
    
})

const Lostfound = mongoose.model("Lostfound",lostfoundSchema);

module.exports=Lostfound;