const express = require('express');
const router = express.Router(); 
const controller =require("../controller/books_controller"); 
const adminAuth = require("../middleware/admin_autharization.js");

//admin 
router.post("/addBook",adminAuth,controller.addNewBook);
router.put('/:id/update',adminAuth,controller.updateBookDetails)
router.post("/:id/allocate",adminAuth,controller.bookCheckInCheckOut); 
router.delete("/delete",adminAuth,controller.deleteBook)


//public 
router.get("/:bookid",controller.getBookDetails);
router.get("/",controller.getAllBooks); 


module.exports = router ;