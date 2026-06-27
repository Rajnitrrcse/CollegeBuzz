const mongoose= require("mongoose");
const complaints=require("./compdata.js");
const Complaint= require("../models/complaint.js");
let dburl='mongodb://127.0.0.1:27017/campus';
let main = async ()=>{
      await mongoose.connect(dburl);
}

main().then(()=>{
    console.log("connection sucesssful with database");
}).catch((err)=>{
    console.log(err);
})

const initialize = async ()=>{
    await Complaint.deleteMany({});
    await Complaint.insertMany(complaints);
}
initialize();
