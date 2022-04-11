const router = require('express').Router();
const User = require("../models/User");
const Post = require("../models/Post");


//TODO: CREATE -----------------------------------------------------
router.post("/", async (req,res) =>{
    const newPost = new Post(req.body);
    try {
        const newlySavedPost = await newPost.save();
        res.status(200).json(newlySavedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


//TODO: RETRIEVE -----------------------------------------------------
router.get("/:id", async (req,res) =>{
    // if(req.body.postID === req.params.id){
        Post.findById(req.params.id, (err,foundDoc) =>{
            if(!err){
                res.status(200).json(foundDoc);
            }
            else{
                res.status(500).json("No matching Post :( ...");
            }
        });
    // }
    // else{
    //     res.status(400).json("No matching Post :( ...");
    // }
});


// TODO: UPDATE ------------------------------------------------------
router.put("/:id", (req, res) =>{
//     if(req.params.id === req.body.postID){
        Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true} , (err, foundDoc)=> {
            if(!err){
                res.status(200).json(foundDoc);
            }
            else{
                res.status(400).json(err);
            }
        })
    // }
});


//TODO: DELETE -------------------------------------------------------
router.delete("/:id", async(req,res) => {
    // if(req.body.postID === req.params.id){
        const currid = req.params.id.toString().trim();
        Post.findById(currid, (err,foundDoc) =>{
            if(!err){
                Post.findByIdAndDelete(currid, err =>{
                    if(err){
                        res.status(500).json(err);
                    }
                });
                res.status(200).json("Post Deleted successfully!!!");
            }
            else{
                res.status(400).json(err);
            }
        });
    // }
    // else{
    //     res.status(401).json("Went wrong");
    // }
});


//TODO: GET ALL FILTERS
router.get("/", async (req,res) =>{
    //req.query gets the input from the url....  Eg. given below
    //  localhost:5000/api/posts?QUERY_FIELD=VALUE&QUERY_FIELD_2=VALUE
    const queryUser = req.query.user;
    const queryCat = req.query.cat;
    //For this purpose we've to use async function, thus for every method on models' must be await
    try {
        //we create a mutable array, and then populate it according to the queries...cause that's what we're gonna send as json response.
        let queryPosts;
        //If query has 'user' field
        if(queryUser){
            queryPosts = await Post.find({author: queryUser});
        }
        //If query has 'category' field
        else if(queryCat){
            queryPosts = await Post.find({categories: {$in: queryCat}});
        }
        //If query has no field mentioned, then show all the posts
        else{
            queryPosts= await Post.find();
        }
        res.status(200).json(queryPosts);
    }
    catch(err) {
        res.status(401).json(err);
    }
});


module.exports = router;

