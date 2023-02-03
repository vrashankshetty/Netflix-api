const mongoose=require("mongoose")

const MovieSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true,
    },
    desc:{
        type:String,
        default:null
    },
    img:{
        type:String,
        default:null
    },
    imgTitle:{
        type:String,
        default:null
    },
    trailer:{
        type:String,
        default:null
    },
    video:{
        type:String,
        default:null
    },
    year:{
        type:String,
        default:null
    },
    limit:{
        type:Number,
        default:null
    },
    genre:{
        type:String,
        default:null
    },
    isSeries:{
        type:Boolean,
        default:false,
    }

},{timestamps:true})


module.exports=mongoose.model("movie",MovieSchema)