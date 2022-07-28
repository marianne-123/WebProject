var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})

let time = new Date(Date.now());

/* Post-route for logging in */
router.post('/login', 
  upload.none(),
  (req, res, next) => {
    console.log(req.body);
    /* Checking if the username can be found from the database */
    User.findOne({username: req.body.username}, (err, user) =>{
    if(err) throw err;
    if(!user) {
      return res.status(403).json({message: "Login failed :("});
    } else {
      /* Checking if the password matches the one saved to the database */
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          /* Creating a token */
          const jwtPayload = {
            id: user._id,
            username: user.username
          }
          jwt.sign(
            jwtPayload,
            "" + process.env.SECRET,
            {
              expiresIn: 240
            },
            (err, token) => {
              console.log("Errors:" + err)
              console.log("token: " + token)
              /* Sending a success message, token and username back to frontend */
              res.json({success: true, token, username: req.body.username});
            }
          );
        }
      })
    }

    })

});


router.get('/register', (req, res, next) => {
});

/* Post-route for registering */
router.post('/register', 
  body("username").isLength({min: 5}).trim(),
  body("password").isLength({min: 5}),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    } /* Checking if the username is already in use */
    User.findOne({username: req.body.username}, (err, user) => {
      if(err) {
        console.log(err);
        throw err
      };
      if(user){
        return res.status(403).json({username: "Username already in use."});
      } else { /* Creting a hashed password */
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            /* Creating a new user and saving it to database */
            User.create(
              {
                username: req.body.username,
                password: hash
              },
              (err, ok) => {
                if(err) throw err;
                return res.redirect("/");
              }
            );
          });
        });
      }
    });
});


/* Post-route for posting a new message. This route saves the message to the database */
router.post('/newpost', (req, res, next) => {
    new Post({
        sender: req.body.sender,
        date: time.toLocaleString('en-GB'),
        text: req.body.text,
        comments: []
    }).save((err) => {
        if(err) return next(err);
        return res.send(req.body);
    });
});

/* Post-route for posting a new comment. 
First we find the correct post according to its ID number, then push the new comment to its comments-array */
router.post('/newcomment', (req, res, next) => {
  console.log(req.body);
  Post.findOne({_id: req.body.id}, (err, post) =>{
    if(err) return next(err);
    if(post) {
      /* Creating a comment in form "sender: comment" */
      let newComment = req.body.sender + ": " + req.body.comment;
      console.log(newComment)
      post.comments.push(newComment)
      post.save((err) => {
        if(err) return next(err); 
      });
    } else {
        return res.status(404).send("Not found");
    }
})

});

/* Get-route to show all the posts. 
Simply sends all the posts from database to frontend. */
router.get("/posts", (req, res, next) => {
  Post.find({}, (err, posts) => {
      
      if(err) return next(err);
      if(posts) {
        return res.json(posts);
      } else {
          return res.status(404).send("Not found");
      }
  })
})


module.exports = router;
