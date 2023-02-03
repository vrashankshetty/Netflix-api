const router=require("express").Router();
const List=require("../models/List")
const verify=require("../verifyToken")

router.post("/",verify,async (req,res)=>{
    if(req.user.isAdmin){
          const newList=new List(req.body)
     try{
         const savedList=await newList.save()
         res.status(200).json(savedList)
     }catch(e){
         res.status(404).json(e)
  }
 }
 else{
    res.status(500).json("You are not allowed")
 }
}
)

router.put("/:id",verify,async (req,res)=>{
    if(req.user.isAdmin){
     try{
         const newList= await List.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
         res.status(200).json(newList)
     }catch(e){
         res.status(404).json(e)
  }
 }
 else{
    res.status(500).json("You are not allowed")
 }
}
)
router.delete("/:id",verify,async (req,res)=>{
    if(req.user.isAdmin){
     try{
          await List.findByIdAndDelete(req.params.id)
         res.status(200).json("the list has been deleted")
     }catch(e){
         res.status(404).json(e)
  }
 }
 else{
    res.status(500).json("You are not allowed")
 }
}
)
router.get("/",verify,async(req,res)=>{
    const typeQuery=req.query.type;
    const genreQuery=req.query.genre;
    console.log(typeQuery)
    let list=[]
    
    try{
        if(typeQuery){
            if(genreQuery){
                list=await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery,genre:genreQuery}}
                ])
                res.status(200).json(list)
            }
            else{
                list=await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery}}
                ])
                res.status(200).json(list)
            }
        }else{
            list=await List.aggregate([
                {$sample:{size:10}}
            ])
            res.status(200).json(list)
        }
    }catch(e){
        res.status(404).json(e)
    }
})


module.exports=router