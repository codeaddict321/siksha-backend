const  express = require('express');
const  router = express.Router();
const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()
router.post('/register',async (req,res)=>{
  try{
    const {username,password} =req.body
    const hashedPwd = await bcrypt.hash(password,10)

    const user = await User.findOne({ username });

    if(user) return  res.json({"msg":"User Already Exist"})
    
    
     User.create({username,password:hashedPwd})
    res.json({"msg":"user created"})
  } catch(err){
    res.json({'error':err})
  }
  
})


router.post('/login', async (req, res) => {

  const { username, password } = req.body;
 
  try {
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
   
 
       
    // At this point, authentication is successful
  
  const token = await jwt.sign({userId:user["_id"]},process.env.ACCESS_SECRET_TOKEN,{expiresIn:'5h'})

    res.json({token});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

   


