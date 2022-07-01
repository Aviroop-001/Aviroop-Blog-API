const router = require('express').Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcrypt');


// TODO: UPDATE ------------------------------------------------------
router.put("/:id", (req, res) =>{
        //if user exists, and body return a password, the user basically wants to change password, so we change the body request password to our hashed password, but not updating it yet!!!!
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        //in findByIdAndUpdate takes '_id' as the first parameter, which is our params.id
        User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true} , (err, foundDoc)=> {
            //* $set sets the new values to our database, we're sending the whole req.body for updation, so it will update only the fields that are send during the request
            if(!err){
                res.status(200).json(foundDoc);
            }
            else{
                res.status(400).json(err);
            }
        })
});

//TODO: DELETE -------------------------------------------------------
router.delete("/:id", (req,res) => {
        const currid = req.params.id.toString().trim();
        User.findById(currid, (err,foundDoc) =>{
            if(!err){
                // Post.deleteMany({username: foundDoc.username});
                User.findByIdAndDelete(currid, err =>{
                    if(err){
                        res.status(500).json(err);
                    }
                });
                res.status(200).json("User Deleted successfully!!!");
            }
            else{
                res.status(400).json(err);
            }
        });
});

//TODO: RETRIEVE -----------------------------------------------------
router.get("/:id", (req,res) =>{
    if(req.body.userID === req.params.id){
        User.findById(req.params.id, (err,foundDoc) =>{
            if(!err){
                //Spread operator
                const {password, ...restOfData} = foundDoc._doc;
                res.status(200).json(restOfData);
            }
            else{
                res.status(500).json(err);
            }
        });
    }
    else{
        res.status(400).json("Wrong User ID :( ...");
    }
});



module.exports = router;

