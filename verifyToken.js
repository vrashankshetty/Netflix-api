const jwt=require("jsonwebtoken")


function verify(req,res,next){
    const authHeader=req.headers.token;
    if(authHeader){
     const token=authHeader.split(" ")[1];
      jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        console.log("err",err)
        if(err) res.status(403).json("Token is invalid")
        else{
        console.log("middleware",user)
        req.user=user;
        next();
        }
      }
      )
    }else{
        return res.status(401).json("You are not authenticated")
    }

}

module.exports=verify