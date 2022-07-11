//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL); 

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

const aboutContent = "Hi, I am Jayant and I'm a postgraduate student in the Department of Computer Science and Engineering at NIT Warangal. I am broadly interested in Competitive Programming. My interests also include software design and development, Data structures and Algorithms, Database management system, Operating system, Computer network. I like to travel. I believe travelling gives you a new perspective to everything. You get to know a lot about the different cultures, the cuisines, their history, the language and all the small unique things every place has to offer.";

const contactContent = `Feel free to mail me at jayantverma8533@gmail.com`; 

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res) {
  Post.find({},function(err, posts) {
    res.render("home", {posts: posts});
  });
});

app.get("/about", function(req,res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req,res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req,res) {
  res.render("compose");
});

app.post("/compose", function(req,res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.post
  });
  post.save(function(err) {
    if(!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req,res) {
  const requestedPostId = req.params.postId;
  Post.findOne({_id:requestedPostId},function(err,post) {
    if(!err) {
      res.render("post",{
        title: post.title,
        content: post.content
      });
    } else {
      console.log(err);
    }
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port,function() {
    console.log("Server has started");
});

