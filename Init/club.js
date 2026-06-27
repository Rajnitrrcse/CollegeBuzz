const mongoose= require("mongoose");
const sampleClubs=require("./clubdta.js");
const Club= require("../models/club.js");
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
    await Club.deleteMany({});
    await Club.insertMany(sampleClubs);
}
initialize();
