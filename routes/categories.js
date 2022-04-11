const router = require('express').Router();
const Category = require("../models/Category");


//TODO: CREATE -----------------------------------------------------
router.post("/", (req,res) =>{
    const newCategory = new Category(req.body);
    newCategory.save();
    res.status(200).json(newCategory);
});


//TODO: RETRIEVE -----------------------------------------------------
router.get("/", (req,res) =>{
    Category.find({} , (err,foundDoc) =>{
        if(!err){
            res.status(200).json(foundDoc);
        }
        else{
            res.status(500).json(err);
        }
    });
});

module.exports = router;
