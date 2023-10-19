const express = require('express')
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT')
const Course = require('../models/course')
const User = require('../models/user')
router.get('/',async(req,res)=>{
  const {courseFilter} = req.query;
 
    if(courseFilter == 'all'||courseFilter ===undefined){
   
      const data = await Course.find();
      res.json({"courses":data})
    }
  else if(courseFilter === 'paid'){
  
    const data = await Course.find({ price: { $ne: 'free' } });
    res.json({"courses":data})
  } else if(courseFilter === "free"){
   
    const data = await Course.find({ price: { $eq: 'free' } });
    res.json({"courses":data})
  }
   
  })
  // router.get('/video/:id', async (req,res)=>{
  //    const {userId} =req.user
  //   console.log(userId);
  //   const id = req.params.id
  //  console.log(id);
   
  //   try{
  //     const userData = await User.findById(userId)
  //     const {coursesBought} = userData
  //       const data = await Course.findOne({ _id: id });
    
   
  //     if(coursesBought.includes(data.courseId)){
  //       res.json(data)
  //     } else{
       
  //       res.status(402).json({'message':"Buy Course To Access"})
  //     }

  
    
  //   } catch(err){
  //     res.status(401).json({'message':err})
  //   }
   
   
    
  //  })
  router.get('/video/:id',async (req,res)=>{
   const id = req.params.id
    if(id === undefined) return res.status(400).json({"message":"Provide Id"})
 
//  const {userId} =req.user
        try{
     // const userData = await User.findById(userId)
      // const {coursesBought} = userData
        const courseInfo = await Course.findOne({ _id: id });
        
        res.json({courseInfo})
    
    //   if(coursesBought.includes(data.courseId)){
        
    //     res.json(data)
    //   } else{
       
    //     res.status(402).json({'message':"Buy Course To Access"})
    //   }

    }
     catch (err) {
  console.log(err);
    }
  
  })

  router.get('/buycourse/:id',verifyJWT,async (req,res)=>{
    const id = req.params.id
      try{
    const data = await Course.findOne({ _id: id });
          res.json(data)
      } catch(err){
        res.status(500).json({"messsage":err})
      }


  })
  router.put('/buycourse/',verifyJWT,async (req,res)=>{
      const {userId} = req.user;
      const {courseId,link} = req.body
   
      try{
   
    const user = await User.findById(userId);
     
    if (user) {
      // Push the new value into the array
      
      user.coursesBought.push(courseId);

      // Save the changes
      await user.save();
      res.json({'message':"Course Added",link})
    } else {
      console.log('User not found');
    }

 
      } 
      catch(err){
        res.status(500).json({"messsage":err})
      }


  })

   module.exports = router