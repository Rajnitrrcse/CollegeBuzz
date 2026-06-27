const mongoose= require("mongoose");
const User= require("./user");
const schema=mongoose.Schema;
const clubSchema= schema({
    clubName:{
        type:String,
        required:true,
    },
    title:{
        type:String,
         required:true,
    },
    description:{
      type:String,
      required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    }
})

const Club = mongoose.model("Club",clubSchema);

module.exports=Club;