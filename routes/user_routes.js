const express = require('express');
const router = express.Router(); 
const controller = require("../controller/user_controller");
const auth = require("../middleware/check_autharization");
router.post("/register",controller.registerUser);
router.post('/login',controller.login) ; 
router.get("/faculty",controller.faculties); 
router.get("/student",controller.students); 
router.post("/changePassword",auth,controller.changePassword);

module.exports = router;