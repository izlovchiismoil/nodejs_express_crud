const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/books/:id", (req, res) => {
    fs.readFile("books.json", "utf8", (err, data) => {
        const books = JSON.parse(data);
        const book = books.find(book => {
            return book.id == req.params.id;
        });
        if (book == undefined) {
            res.send("Kitob topilmadi");
        }
        else if (book) {
            res.send(book);
        }
        
    });
    
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishga tushdi`);
});