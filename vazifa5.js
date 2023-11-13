const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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
            books.splice(books.indexOf(findedBook),1);
            
            fs.writeFile("books.json", JSON.stringify(books), (w_err) => {
                if (w_err) {
                    res.send("Malumot yozishda xatolik");
                    throw w_err;
                }
            });
            res.send(
                `
                <html>
                    <head><title>Kitob o‘chirish</title></head>
                    <body>
                        <ul>
                            <li>ID: ${findedBook.id}</li>
                            <li>Title: ${findedBook.title}</li>
                            <li>Author: ${findedBook.author}</li>
                        </ul>
                    </body>
                </html>
                `
                );
            return;
        }
        res.send("Kitob topilmadi");
        return;
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} - portda ishga tushdi`);
});