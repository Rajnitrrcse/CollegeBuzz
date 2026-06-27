const mongoose= require("mongoose");
const lostFoundData=require("./lostdata.js");
const Lostfound= require("../models/Lostfound.js");
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
    await Lostfound.deleteMany({});
    await Lostfound.insertMany(lostFoundData);
}
initialize();
