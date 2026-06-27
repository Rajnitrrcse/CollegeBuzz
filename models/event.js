const mongoose= require("mongoose");
const User= require("./user");
const schema=mongoose.Schema;
const Eventreg=require("./eventreg");
const eventSchema= schema({

     registereduser:[{
         type:schema.Types.ObjectId,
         ref:"Eventreg"
     }],
     
     owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    },
    eventName:{
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
     createdAt:{
        type:Date,
        default:  Date.now(),
    },
    Location:{
        type:String,
        required:true,
    },
    eventDate:{
        type:String,
        required:true,
    },
    eventTime:{
        type:String,
        required:true,
    }
})

const Event = mongoose.model("Event",eventSchema);

module.exports=Event;