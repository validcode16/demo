const express = require('express');
const apiRoutes = require('./routes/api');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const studentRoutes = require('./routes/get-user')
const restrictedProductsRoutes = require('./routes/restricted-product');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const dbPath = 'mongodb://127.0.0.1/ProductApplication';

mongoose.set('strictQuery', false);
mongoose.connect(dbPath).then(()=>{
    console.log("Connected to the mongoDb Database");
})



const app = express();

const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', apiRoutes);
//  use-> middle ware function
app.use('/api/user', userRoutes);
app.use('/api', productRoutes);
app.use('/api', restrictedProductsRoutes);
app.use('/Assets', express.static('Assets'));
app.use('/api', studentRoutes);

const multerStorage = multer.diskStorage({
    destination: (req, file, callBack)=>{
        callBack(null, './Assets')
    },

    filename: (req, file, callBack)=>{
        console.log(file.originalname);
        callBack(null, 'My_file_'+file.originalname)  
    }
}) 

const fileUpload = multer({storage:multerStorage});

// upload file api key
app.post('/file-upload', fileUpload.single('file'), (req, res)=>{
    let file = req.file;
    console.log(req.file);
    if(!file){
        res.send('File can not be uploaded')
    }
    else{
       res.send(file);
    }
})


// port start
app.listen(port, ()=>{
    // console.log("Listening on port 5000, server is started");
    console.log('server is started, Listening on port ${port}');
})


// const OS = require('os');
// const path = require('path');
// const fs = require('fs');
// const http = require('http');
// // console.log(http);
// let userDetails = [{
//     id: 1,
//     first_name: "Ajay",
//     last_name: "Gavit",
//     email: "ajay@gmail.com"
// },
// {
//     id: 2,
//     first_name: "Milind",
//     last_name: "Ahire",
//     email: "milin@gmail.com"
// },
// {
//     id: 3,
//     first_name: "pratik",
//     last_name: "Kadam",
//     email: "pratik@gmail.com"
// }
// ]

// app.get('/api/v1/getName', (req,res)=>{
//     console.log("first API created");
//     res.send("<h1>Hello from api</h1>");
// })

// // second API
// app.get('/api/v1/getUserDetails', (req, res)=>{
//     res.status(999).json({userData: userDetails});
// })

// // third API
// app.get('/api/v1/getUserById/:id/:name', (req, res)=>{
//     let id = req.params.id;
//     let name = req.params.name;
//     console.log(id, name);
//     let response = userDetails.filter(element=> element.id == id);
//     console.log(response);
//     res.json(response);
// })

// app.get('/api/v1/getfile', (req, res)=>{
//     // console.log(__dirname + "/index.html");
//     res.sendFile(__dirname + "/index.html");
//     // ___dirname provide cuurent director name 
    
// })

// get api (first APi)



// console.log(OS);

// console.log(__dirname);
// console.log(__filename);
// console.log(module);

// console.log(secondModule);

// console.log("first backend application");
// // console.log("Second backend application");
// console.log(secondModule.private_value);



// let a = 100;
// let b = 50;

// let c = a +b;
// console.log(a,b,c);
