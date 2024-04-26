const jsonwebtoken = require('jsonwebtoken');
const User = require('../model//user_model'); 

var checkAuthToken = async (req,res,next )=> {
    let token;
    const { authorization} =  req.headers; 
    if (authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1]; 
            const userId = jsonwebtoken.verify(token, process.env.SECRET_KEY);
            req.user = await User.findById(userId['userID']).select('-password');
            next(); 
        }catch(err){
            res.status(403).send({"status":"failed","message":"Unauthorized sender"}); 
        }

    }
    if (!token){
        res.send({"status":"failed","message":"Token not found"}); 
    }
}
module.exports= checkAuthToken;