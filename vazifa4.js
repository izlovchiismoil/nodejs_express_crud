const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send(`
        <html>
            <head><title>Kitob qo‘shish</title></head>
            <body>
                <form action="/books" method="PUT">
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

// Kitobni id bo‘yicha
app.get("/books/:id", (req, res) => {
    //books.json faylni o‘qish
    fs.readFile("books.json", "utf8", (err, data) => {
        
        // books.json faylini json malumotini obyektga o‘girish
        const books = JSON.parse(data);
        
        // id bo‘yicha kitobni izlash
        const findedBook = books.find(book => {
            return book.id == parseInt(req.params.id);
        });
        
        // kitob mavjud bo‘lganda uni parametr
        if (findedBook != undefined) {
            res.send(
                `
                <html>
                    <head><title>Kitob qo‘shish</title></head>
                    <body>
                        <form action="/books" method="POST">
                            <label for="book_id">Book ID</label>
                            <input type="text" id="book_id" name="book_id" value="${findedBook.id}">
                            <label for="title">Title</label>
                            <input type="text" id="title" name="title" value="${findedBook.title}" placeholder="Title...">
                            <label for="author">Author</label>
                            <input type="text" id="author" name="author" value="${findedBook.author}" placeholder="Author...">
                            <input type="submit" value="Tahrirlash">
                        </form>
                    </body>
                </html>
                `
            );
            return;
        }
    });
});

app.post("/books", (req, res) => {
    fs.readFile("books.json", "utf8", (err, data) => {

        const parsedData = JSON.parse(data);

        
        parsedData[req.body.book_id].title = req.body.title;
        parsedData[req.body.book_id].author = req.body.author;

        fs.writeFile("books.json", JSON.stringify(parsedData), (err) => {
            if (err) {
                res.send("Malumot yozishda xatolik");
                throw err;
            }
        });
        res.send(
            `
            <html>
                <head><title>Kitob tahrirlash</title></head>
                <body>
                    <ul>
                        <li>ID: ${parsedData[req.body.book_id].id}</li>
                        <li>Title: ${parsedData[req.body.book_id].title}</li>
                        <li>Author: ${parsedData[req.body.book_id].author}</li>
                    </ul>
                </body>
            </html>
            `
            );
        return;
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} - portda ishga tushdi`);
});