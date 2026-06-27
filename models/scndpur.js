const mongoose= require("mongoose");
const User= require("./user");
const schema=mongoose.Schema;
const scndpurSchema= schema({
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

const Scndpur = mongoose.model("Scndpur",scndpurSchema);

module.exports=Scndpur;