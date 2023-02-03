const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    profilePicture:{
        type:String,
        default:" ",
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},{timestamps:true})


module.exports=mongoose.model("users",UserSchema)
    