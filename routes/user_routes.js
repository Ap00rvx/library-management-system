const express = require('express');
const router = express.Router(); 
const controller = require("../controller/user_controller");

router.post("/register",controller.registerUser);
router.post('/login',controller.login) ; 
router.get("/faculty",controller.faculties); 
router.get("/student",controller.students); 


module.exports = router;