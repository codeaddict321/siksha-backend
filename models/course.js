const mongoose = require('mongoose')
const {Schema} = mongoose;
const {model} = mongoose;

const courseSchema  = new Schema({
    courseName:String,
    thumbnailUrl:String,
    videoRef:String,
    price:String,
    courseId:String,
    description:String,
    validity:String


})
const course =  model('Course',courseSchema)
module.exports =course
