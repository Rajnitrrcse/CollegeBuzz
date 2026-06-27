 const mongoose= require("mongoose");
const schema=mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");
const userSchema= schema({
     email:{
        type:String,
        required:true,
     },
     mobile:{ 
        type:Number,
        required:true,
     },
     name:{
      type:String,
      required:true,
     },
     roll:{
      type:Number,
     },
     id_admin:{
      type:String,
     }
});

userSchema.plugin(passportLocalMongoose.default);
const User = mongoose.model("User",userSchema);

module.exports=User;