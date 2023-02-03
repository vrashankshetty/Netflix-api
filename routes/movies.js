const router=require("express").Router();
const Movie=require("../models/Movie")
const verify=require("../verifyToken")

router.post("/",verify,async (req,res)=>{
   if(req.user.isAdmin){
         const newMovie=new Movie(req.body)
    try{
        const savedMovie=await newMovie.save()
        res.status(200).json(savedMovie)
    }catch(e){
        res.status(404).json(e)
 }
}
    else{
       res.status(200).json("You cant add a movie")
    }
   }
)
router.delete("/delete/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("The movie has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

router.put("/:id",verify,async (req,res)=>{
    if(req.user.isAdmin){
          
     try{
         const newMovie=await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}) 
         res.status(200).json("movie is updated")
     }catch(e){
         res.status(404).json(e)
  }
 }
     else{
        res.status(200).json("You cant update a movie")
     }
    }
 )

 router.get("/find/:id",verify,async (req,res)=>{
     try{
         const newMovie=await Movie.findById(req.params.id) 
         res.status(200).json(newMovie)
     }catch(e){
         res.status(404).json(e)
  }
 }
 )

 router.get("/random",verify,async (req,res)=>{
    const type=req.query.type;
    let movie;
    try{
         if(type==="series"){
            movie=await Movie.aggregate([
                {$match:{isSeries:true}},
                { $sample:{size:1}},
            ])
            res.status(200).json(movie)
         }else{
            movie=await Movie.aggregate([
                {$match:{isSeries:false}},
                { $sample:{size:1}},
            ])

            res.status(200).json(movie)
         }
     }catch(e){
         res.status(404).json(e)
  }
    }
 )

 router.get("/", verify, async (req, res) => {
    console.log("user",req.user);
    if (req.user && req.user.isAdmin) {
      try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
module.exports=router