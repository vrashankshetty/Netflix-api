const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const route=express.Router();
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const movieRoute=require("./routes/movies")
const listroute=require("./routes/lists")
const cors=require('cors');//use this if proxy doesnt wwork
app.use(cors());
dotenv.config()
app.use(express.json())
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>{
    console.log("mongoose connected")
})
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/movies",movieRoute)
app.use("/api/lists",listroute)

app.listen(8000,()=>{
    console.log("backend connected")
})
