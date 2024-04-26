const { BookModel } = require("../model/book_model");
const User = require("../model/user_model");

class BooksController {

    static addNewBook =async (req,res)  => {
        try {
        const  {name,bookId,description,price,authorName,genre,deck} = req.body; 
        const book = await BookModel.findOne({bookId :bookId});
        
       
        if (book){
            res.send({"status":"failed","message":"Book already Exist"})
        }
        if(name && bookId && description && genre&&price && authorName && deck){
            const newBook = new BookModel({
                bookId:bookId,
                name:name,
                authorName:authorName,
                price:price,
                genre :genre,
                deck:deck,
                description:description,
            });
            await newBook.save();
            res.status(201).send({"status":"success","message":"New Book Added","book":newBook});
        }
        else{
            res.send({"status":"failed", "message":"All fields are required"})
        }
       }catch(err){
        res.send({"status":"failed","message":"Internal Server error"}); 
       }
    
    }
    static getBookDetails  = async (req,res) => {
        const bookId =  req.params.bookid; 
        console.log(bookId);
        const book = await BookModel.findOne({bookId:bookId}); 
        if (book){
            res.send({"status":"success","message":book});
        }
        else{
            res.status(404).send({"status":"404 not Found, Failed ","message":"Book not Found"})
        }
    }
    static deleteBook = async(req,res) => {
        const {bookId} = req.body ; 
        const result = await BookModel.deleteOne({bookId:bookId}); 
        res.send({"status":"success","message":"Book detail Deleted"}); 
    }
    static getAllBooks = async (req,res) => {
        try {
        const books = await BookModel.find(); 
        res.send({"status":"success","books":books}); 
        }catch(err){
            console.log(err);
            res.send({"status":"failed","message":"Internal Server error"})
        }
    }
    static updateBookDetails = async (req, res) => {
        const { name, description, price, authorName, deck ,issuedTo ,issuedOn,returnDate} = req.body;
        const bookId  = req.params.id ;
        console.log(bookId);
      
        try {
          const book = await BookModel.findOneAndUpdate(
            { bookId: bookId },
            { $set: { name, description, price, authorName, deck,issuedTo,issuedOn,returnDate } },
            { new: true } // Return the updated document
          );
      
          if (!book) {
            return res.status(404).json({ message: 'Book not found' });
          }
      
          res.json(book);
        } catch (error) {
          console.error('Error updating book:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
    }
    static bookCheckInCheckOut = async (req,res) => {
        const { uniqueId} = req.body ; 
        const bookId = req.params.id; 
        let book = await BookModel.findOne({bookId : bookId});
        
        if (bookId && uniqueId){
        if (book ){
            if (book.issuedTo == 0){
                await BookModel.findOneAndUpdate({bookId:bookId},{$set: { issuedTo:uniqueId,available:false,issuedOn:Date.now() }}); 
                let student  =  await User.findOne({uniqueId:uniqueId});
                let arr =student.booksIssued;
                arr.push(bookId); 
                await   User.findOneAndUpdate({uniqueId:uniqueId},{$set: { booksIssued:arr}});

                res.send({"status":"success","message":`book is allocated to ${uniqueId}`}); 
                
            }
            else if(book.issuedTo == uniqueId){
                await BookModel.findOneAndUpdate({bookId:bookId},{$set: { issuedTo:0 , available :true,returnDate:Date.now()}});
                let  book  = await BookModel.findOne({bookId:bookId}) ; 
                let student  =  await User.findOne({uniqueId:uniqueId});
                let arr =student.booksIssued;
                arr.remove(bookId); 
                await   User.findOneAndUpdate({uniqueId:uniqueId},{$set: { booksIssued:arr}});
                res.send({"status":"success","message":"Book is returned to library","time":Math.ceil(Math.abs(Date.now() - book.issuedOn)/(1000 * 60 * 60 * 24)) + "days"}); 
            }
            else{
             res.send({"message":"student number didnt match or book is not available "}); 
            }
        }
        else{
            res.status(404).send({"status":"failed","message":"Book not found "}); 
        }
    }
    else{
        res.status(400).send({"status":"failed","message":"All fields are required"});
    }
    } 
    
}

module.exports = BooksController ; 