const mongoose= require("mongoose");
const cabData=require("./cabdata.js");
const Cab= require("../models/cab.js");
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
    await Cab.deleteMany({});
    await Cab.insertMany(cabData);
}
initialize();
