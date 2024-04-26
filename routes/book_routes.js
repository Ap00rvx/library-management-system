const express = require('express');
const router = express.Router(); 
const controller =require("../controller/books_controller"); 


router.post("/addBook",controller.addNewBook);
router.get("/:bookid",controller.getBookDetails);
router.put('/:id/update',controller.updateBookDetails)
router.get("/",controller.getAllBooks); 
router.post("/:id/allocate",controller.bookCheckInCheckOut); 
router.delete("/delete",controller.deleteBook)

module.exports = router ;