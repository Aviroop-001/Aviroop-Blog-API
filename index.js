//!  ---------------------------Importing DEPENDENCIES-----------------------------------
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");
const cors = require("cors");

//!  --------------------------------Importing Routes------------------------------------------
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");

//TODO: dotenv are the secret files that store info that nedds to be hidden from the customers
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


//TODO: Connecting to MongoDB________________________________________

mongoose.connect(process.env.mongo_URL)
.then(console.log("Connected to MongoDB"))
.catch( err => {
    console.log(err);
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

// https://aviroop-blog-api.herokuapp.com/ API is live here