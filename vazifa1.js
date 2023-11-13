const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());

app.use("/books", (req, res) => {
    fs.readFile("books.json", "utf8", (err, data) => {
        if (data) {
            res.send(data);
        }
        else {
            res.send(err);
        }
        
    });
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);