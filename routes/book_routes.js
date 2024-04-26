const express = require('express');
const router = express.Router(); 
const controller =require("../controller/books_controller"); 

//admin 
router.post("/addBook",controller.addNewBook);
router.put('/:id/update',controller.updateBookDetails)
router.post("/:id/allocate",controller.bookCheckInCheckOut); 
router.delete("/delete",controller.deleteBook)


//public 
router.get("/:bookid",controller.getBookDetails);
router.get("/",controller.getAllBooks); 


module.exports = router ;