const mongoose = require('mongoose')
const {Schema} = mongoose;
const {model} = mongoose;

const userSchema  = new Schema({
    username:String,
    password:String,
    coursesBought: {
        type: Array,
        default: ['free'] 
      }

})
const user =  model('User',userSchema)
module.exports = user