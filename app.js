const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const app = express()
const port = process.env.PORT
const bookRouter = require("./routes/book_routes");
const userRouter = require("./routes/user_routes");
const db = require("./config/connectDB"); 
app.use(express.json()); 
db(process.env.DATABASE_URL)
app.use("/api/user/",userRouter);
app.use("/api/books/",bookRouter);
app.get('/', (req, res) => res.send({"message":'Hello World!'}))
app.listen(port, () => console.log(`App listening on  http://localhost:${port}`))
