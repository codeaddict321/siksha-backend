

const mongoose = require('mongoose')
let isConnected = false; 
async function  connectDB() {
    if (isConnected) {
        return; // If already connected, return early
      }
    try{
        await mongoose.connect('mongodb+srv://technicalboyrishad:rishad@cluster0.vb1w39i.mongodb.net/sikhsha')
        console.log('connected');
        isConnected = true;
    } catch(err){
        console.log(err)
    }
    
}

module.exports = connectDB