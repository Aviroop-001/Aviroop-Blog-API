
const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


// TODO: REGISTER ------------------------------------------------------

router.post("/register", async (req, res) =>{

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        //TODO: we're using await cause we're waiting for its response to come. 
        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
});

//TODO: LOGIN ---------------------------------------------------------

router.post("/login", async (req,res) =>{
    const currUsername = req.body.username;
    const currPassword= req.body.password;
    User.findOne({username: currUsername}, async (err, foundDoc) =>{
        if(!err){
            const validatePassword= await bcrypt.compare( currPassword, foundDoc.password);
            if(validatePassword){
                res.status(200).json(foundDoc);
            }
            else{
                res.status(400).json("Wrong credentials");
            }
        }
        else{
            res.status(500).json(error);
        }
    });

});


module.exports = router;