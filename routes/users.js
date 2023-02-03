const router=require("express").Router();
const User=require("../models/User")
const CryptoJS=require("crypto-js")
const verify=require("../verifyToken")


router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
   console.log("stats")
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month:"$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    console.log("data",data)
    res.status(200).json(data)
  } catch (err) {
    console.log("data",data)
    res.status(500).json(err.message);
  }
})


//Update'
router.put("/:id",verify,async (req,res)=>{
   if(req.user.userid === req.params.id || req.user.isAdmin){
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
    }
    try{
        const updateUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateUser)
    }catch(e){
        res.status(404).json(e)
 }
}
    else{
       res.status(200).json("You can only update your account")
    }
   }
)

//delete
router.delete("/find/:id",verify,async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
  try{
     await User.findByIdAndDelete(req.params.id)
     res.status(200).json("User has been deleted")
  }catch(e){
     res.status(500).json(e)
  }
}
else{
    res.status(403).json("You cant delete your account")
}
}
)

router.get("/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(user)
    }catch(e){
        res.status(404).json(e)
    }
})


//get all only for admin
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});

module.exports=router