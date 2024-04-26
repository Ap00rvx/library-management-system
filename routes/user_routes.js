const express = require('express');
const router = express.Router(); 
const controller = require("../controller/user_controller");
const auth = require("../middleware/check_autharization");
//public 
router.post("/register",controller.registerUser);
router.post('/login',controller.login) ; 

//admin access
router.get("/faculty",controller.faculties); 
router.get("/student",controller.students); 

//protected -> 
router.post("/changePassword",auth,controller.changePassword);
router.get("/profile",auth,controller.getProfile); 

module.exports = router;