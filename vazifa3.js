const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send(`
        <html>
            <head><title>Kitob qo‘shish</title></head>
            <body>
                <form action="/books" method="POST">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Title...">
                    <label for="author">Author</label>
                    <input type="text" id="author" name="author" placeholder="Author...">
                    <input type="submit" value="Saqlash">
                </form>
            </body>
        </html>
    `);
});

app.post("/books", (req, res) => {
    fs.readFile("books.json", "utf8", (err, data) => {
        const books = JSON.parse(data);
        const findedBook = books.find(book => {
            return book.title == req.body.title;
        });
        
        if (findedBook == undefined) {
            books.push({id: (books.length + 1), title: req.body.title, author: req.body.author});
            fs.writeFile("books.json", JSON.stringify(books), (err) => {
                if (err) {
                    throw err;
                }
                else {
                    res.send("Kitob qoshildi");
                }
            });
        }
        else {
            res.send("Bunday kitob mavjud!");
            return;
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} - portda ishga tushdi`);
});