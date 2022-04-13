//!  ---------------------------Importing DEPENDENCIES-----------------------------------
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer  = require('multer');
const path = require("path");
const cors = require("cors");

//!  --------------------------------Importing Routes------------------------------------------
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");

//TODO: dotenv are the secret files that store info that nedds to be hidden from the customers
dotenv.config();
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//!  ------------------------------DB CONNECTION---------------------------------------
//TODO: Connecting to MongoDB________________________________________

mongoose.connect(process.env.mongo_URL)
.then(console.log("Connected to MongoDB"))
.catch( err => {
    console.log(err);
});

//!  -------------------------BACKEND IMAGE UPLOADING USING MULTER --------------------------

//TODO: The storage has two args, destination(where the media will be saved) and filename(what will be the name of the saved file)
const storage= multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, "images");
    },
    filename: (req, file, callback)=>{
        //TODO: the second parameter is the filename with which a particular image will be saved. Here we've named it "hello.jpeg", but in reality, we need to give it the name we're getting from the response, that is 'res.body.name'.....
        
        const nm = JSON.stringify(req.body.name);
        callback(null, Date.now()+file.originalname);
    }
});

const upload = multer({storage: storage});
//TODO: once we get the image from the client side, we need to save it
app.post("/api/upload", upload.single("file"), (req,res)=>{
    console.log('File Uploaded Successfully.....')
    res.status(200).json("File Uploaded Successfully :> ")
});


//!  ------------------------------------ROUTES---------------------------------------------
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);

app.get('/', (req,res) =>{
    res.send('Blog API is working');
})

//TODO: Listening for Backend___________________________________________
app.listen(process.env.PORT || 5000, () =>{
    console.log('Backend is up and running....');
});