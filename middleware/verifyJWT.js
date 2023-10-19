require('dotenv').config()
const jwt = require('jsonwebtoken')


function verifyJWT(req,res,next) {
  
    const authHeader = req.headers['authorization'];
 
    if (!authHeader) {
        return res.status(401).json({ message: 'Login To Access Course' });
      }
      const token = authHeader.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
      }
         
      try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    
        req.user = decodedToken
 
       // Extracted username from the token
        // Now you can use the username for further processing
       next()
      } catch (error) {
     console.log(error);
        res.status(403).json({ message: error });
      }
    
}
module.exports = verifyJWT