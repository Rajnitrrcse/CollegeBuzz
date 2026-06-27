const mongoose= require("mongoose");
const User= require("./user");
const schema=mongoose.Schema;
const lostclaimSchema= schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
         required:true,
    },
    roll:{
        type:Number,
        required:true,
    },
    mobile:{
      type:String,
      required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type:String,
        required:true,
    }
})

const Lostclaim = mongoose.model("Lostclaim",lostclaimSchema);

module.exports=Lostclaim;