
if(process.env.NODE_ENV!=="production"){
    require("dotenv").config();
}



const express= require("express");
const mongoose= require("mongoose");
const ejsMate=require("ejs-mate");
const methodoverride= require("method-override");
const session= require("express-session");
const Club= require("./models/club.js");
const User= require("./models/user.js");
const app= express();
const path= require("path");
const passport=require("passport");
const localStrategy=require("passport-local");
const clubroute= require("./routes/clubroute.js");
const cabroute= require("./routes/cabroute.js");
const eventroute= require("./routes/eventroute.js");
const secondhandroute= require("./routes/secondhand.js");
const lostfoundroute= require("./routes/lostfoundroute.js");
const complaintroute= require("./routes/complaintroute.js");
const userroute=require("./routes/user.js");
const MongoStore = require('connect-mongo').default;
const  dburl=process.env.ATLASDB_URL;
const expressError= require("./utils/expressError.js");
const flash=require("connect-flash");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodoverride("_METHOD"));
app.use(flash());

const store= MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*60*60,
})


store.on("error", (err) => {
    console.log("Error in Mongo Session Store", err);
});


const sessionOptions= {
    store:store,
    secret:"mysecretcode",
    resave:false,
     saveUninitialized:true,
     cookie:{
        expires:Date.now() +7*24*60*60*1000,
     maxAge:7*24*60*60*1000,
     httpOnly:true,
     }
}




app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.successmsg=req.flash("success");
    res.locals.errormsg=req.flash("error");
    res.locals.currUser=req.user;
    next();
})



let main = async ()=>{
      await mongoose.connect(dburl);
}

main().then(()=>{
    console.log("connection sucesssful with database");
}).catch((err)=>{
    console.log(err);
})

app.get("/index",(req,res)=>{
    res.render("index.ejs");
})
app.use("/index/user",userroute);
app.use("/index/club",clubroute);
app.use("/index/event",eventroute);
app.use("/index/secondhand",secondhandroute);
app.use("/index/lostfound",lostfoundroute);
app.use("/index/cab",cabroute);
app.use("/index/complaint",complaintroute);
app.get("/index/privacy",(req,res)=>{
    res.render("privacy.ejs")
})
app.get("/index/terms",(req,res)=>{
    res.render("terms.ejs")
})



app.use("/",(req,res,next)=>{
    next(new expressError(400,"Page not found")) ;
})



app.use((err,req,res,next)=>{
    let {message="Some error occured" ,status=500}=err;
     res.status(status).render("error.ejs",{message});
})

app.listen(8080,()=>{
    console.log("app is listning on port 8080");
})