const mongoose = require('mongoose');
const User = require('./user_model');

const BookSchema  = new mongoose.Schema({
        name :{
            type:String,
            required :true , 
        },
        bookId:{
            type:String,
            required:true,
            unique :true 
        },
        description:{
            type:String,
            maxlength: 250,
            required :true,

        },
        genre:{
            type:String, 
            required:true, 
            // default :"not-provided"
        },
        available :{
         type :Boolean,
         default : true , 
        },
        price:{
            type:Number,
            required:true,
        },
        authorName:{
            type:String,
            maxlength: 50,
            required :true,

        },
        publishedDate :{
            type: Date,
            default :Date.now()
        },
        deck:{
            type:String ,
            maxlength :10,
            required :true
        },
        issuedTo:{
            type: Number,
            default :0
        },
        issuedOn:{
            type :Date,
            default :Date.now(),  
        },
        returnDate:{
            type:Date,
            default:Date.now(),
        }
});

const BookModel = mongoose.model("Book",BookSchema); 

module.exports = {BookModel}; 