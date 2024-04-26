const mongoose = require('mongoose');
const UserSchema = new  mongoose.Schema({
    name  : {
        type:String,
        required :true, 
        trim:true,
    },
    email  : {
        type:String,
        required :true, 
        trim:true,
        unique: true 
    },

    uniqueId: {
        type: Number,
        required:true,
        unique: true,
    },

    role:{
        type:String, 
        default:"student",
        enum:["student","admin","faculty"] 
    },
    password:{
        type:String,
        required :true, 
        trim:true,
    },
    booksIssued:{
        type:Array,
        default:[],
    },
    createAt:{
        type:Date,
        default :Date.now()
    },

});
const User = mongoose.model("user",UserSchema); 
module.exports = User; 