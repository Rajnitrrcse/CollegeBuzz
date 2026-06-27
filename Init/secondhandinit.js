const mongoose= require("mongoose");
const secondHandProducts=require("./secondhanddata.js");
const Secondhand= require("../models/secondHand.js");
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
    await Secondhand.deleteMany({});
    await Secondhand.insertMany(secondHandProducts);
    console.log("inserted sucessfully");
}
initialize();
