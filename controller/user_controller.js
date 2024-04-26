const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken"); 
const User = require("../model/user_model"); 
// const sendMail  = require("../config/mail_config")
class UserContoller {
    static registerUser = async (req,res) => {
        try{
            const {name,email,password,uniqueId,role} = req.body ;   
            const salt = await bcrypt.genSalt(10); 
            const hashpassword = await bcrypt.hash(password,salt); 
            if(role == 'student'){
                if (uniqueId){
                const existingUser  = await User.findOne({uniqueId :uniqueId}) ; 
            if(existingUser){return res.send({"status":"failed","message":"User already exist"})  }
                if(name && email && password && uniqueId && role ){
                    const student  = new User({
                        name:name, 
                        email: email,
                        password:hashpassword,
                        uniqueId:uniqueId,
                        role :role,
                        
                    }); 
                    await student.save();      
                    // res.send({"status":"success","message":"student added"}); 
                    const saved_user =await User.findOne({email:email});
                    const token = jwt.sign({userID:saved_user._id},process.env.SECRET_KEY,{expiresIn : '150d'});
                    // sendMail(email);
                    res.status(201).send({"status":"success", "message":"User created successfully","token":token}); 

                }
                else{
                    res.send({"status":"failed",message:"All fields are required"}) ;
                }
            }
            else{
                res.send({"status":'failed',"message":"student number is not provided"}); 
            }
            }
            else if (role == "faculty"){
                const existingUser  = await User.findOne({uniqueId :uniqueId}) ; 
            if(existingUser){res.send({"status":"failed","message":"Faculty exist"})}
                  if(name && email && password  && role ){
                    const faculty  = new User({
                        name:name, 
                        email: email,
                        password:hashpassword,
                        role :role,  
                        uniqueId:uniqueId 
                    }); 
                    await faculty.save();
                    const saved_user =await User.findOne({uniqueId:uniqueId});
                    const token = jwt.sign({userID:saved_user._id},process.env.SECRET_KEY,{expiresIn : '150d'});
                    // sendMail(email);
                    res.status(201).send({"status":"success", "message":"User created successfully","token":token}); 

                }
                else{
                    res.send({"status":"failed",message:"All fields are required"}) ;

                }
            }
            else{
                res.send({"status":"failed",message:"Invalid role"}) ;
            }
                
            
        }catch(err){
            console.log(err);
            res.send({"status":"failed","message":"Internal Server Error "+err});
        }
    }
    static login = async (req,res) => {
        try{
            const {uniqueId,password} = req.body; 
            if(uniqueId && password){
                const user = await User.findOne({ uniqueId: uniqueId });
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch) {
                        const token = jwt.sign({userID:user._id},process.env.SECRET_KEY,{expiresIn : '150d'});
                        res.send({ "status": "success", "message": "Login Success","token":token });
                    } else {
                        res.send({ "status": "failed", "message": "Invalid password" });
                    }
            }
            else{
                res.status(404).send({"status":"failed",message:"User not found"}); 
            }
          }
            else{
                res.send({"status":"failed",message:"All fields are required"});
            }
        
    
        }catch(err){
            console.log(err);
            res.send({"status":"failed","message":"Internal Server Error " +err});
        }

    }
    static changePassword = async (req,res) => {
        const {password ,cpassword }= req.body ;
        if (password && cpassword){
            if(password === cpassword){
                const salt = await bcrypt.genSalt(10); 
                const newPassword = await bcrypt.hash(password,salt); 
                await User.findByIdAndUpdate(req.user._id, {password:newPassword}); 
                res.send({status :"success","message":"Password updated"}); 
            }else{
                res.send({"status":"failed",message:"Password doesn't match"}); 
            }

        }else {
            res.send({"status":"failed",message:"All fields are required"})
        } 
    }
    static getProfile = async (req,res)=>{
        const id   = req.user._id;
        if (id)
        {
            const user  = await User.findById(id);
            if(user.role == 'admin'){
                const admindata = await User.findById(id).select("-password -uniqueId");  
                res.send({status:"success","user":admindata});
            }
            else{
            res.send({status:"success","user":user});
            }  
        } 
        else{
            res.seng({"status":"failed","message":"User not logged in"});
        }
    }
    static faculties = async (req,res) => {
        const faculty = await User.find({role:'faculty'}); 
        res.send({"status":"success","faculty":faculty});

    }
    static students  = async (req,res) => {
        const student = await User.find({role:'student'}).select('-password'); 
        res.send({"status":"success","students":student});
    }
    
}
module.exports = UserContoller; 