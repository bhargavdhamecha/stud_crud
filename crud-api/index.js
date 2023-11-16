const express = require('express');
const postRouter = require('./routes/posts.router');
const cors = require('cors');
const multer = require('multer');
const upload = multer(); 
const PORT = 3000;

var app = express();
app.use(express.json());
app.use(cors());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.use('/school_student', postRouter);

app.listen(PORT, ()=>{
    console.log("server started listening on Port: ", PORT);
});

