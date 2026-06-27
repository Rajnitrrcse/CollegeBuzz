const mongoose= require("mongoose");
const sampleEvents=require("./eventdata.js");
const Event= require("../models/event.js");
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
    await Event.deleteMany({});
    await Event.insertMany(sampleEvents);
}
initialize();
