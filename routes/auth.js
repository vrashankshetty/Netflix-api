const router=require("express").Router();
const User=require("../models/User")
const jwt=require("jsonwebtoken")
const CryptoJS=require("crypto-js")

router.post("/register",async (req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
    })
    try{
      const data=await newUser.save()
      res.status(200).json(data)
    }catch(e){
       res.status(404).json(e)
    }
})

router.post("/login",async (req,res)=>{
    try{
     const user=await User.findOne({email:req.body.email})
     const {password,...info}=user._doc
     const accessToken= jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin
    },process.env.SECRET_KEY,{expiresIn:"5d"})
     user?((req.body.password===CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8))?
        res.status(200).json({...info,accessToken}):
        res.status(404).json("Wrong password or username")):
        res.status(404).json("Wrong password or username")

      
    }catch(e){
        res.status(404).json(e.message)
    }
})








module.exports=router