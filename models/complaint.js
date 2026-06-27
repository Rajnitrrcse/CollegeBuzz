 const mongoose= require("mongoose");
 const User= require("./user");
const schema=mongoose.Schema;
const complaintSchema= schema({
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    },
  details:{
    type:String,
    required:true,
  },
  opposite_party_details:{
    type:String,
  },
  facts:{
     type:String,
  },
  specifics:{
    type:String,
  },
  relief:{
      type:String,
  },
  contact:{
    type:String,
  }

})

const Complaint = mongoose.model("Complaint",complaintSchema);

module.exports=Complaint;