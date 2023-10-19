const mongoose = require('mongoose')
const {Schema} = mongoose;
const {model} = mongoose;

const userSchema  = new Schema({
  googleId:String,
    coursesBought: {
        type: Array,
        default: ['free'] 
      }

})
const user =  model('PassportUser',userSchema)
module.exports = user