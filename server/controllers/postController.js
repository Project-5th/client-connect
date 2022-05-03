const Post = require("../models/postModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/userModel");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    var dir = "../public/img/posts";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage: multerStorage,
}).array("image", 5);

exports.newPost = async (req, res, next) => {
  try {
    // console.log(req);
    const user = await User.findById(req.params.id);
    const newPost = new Post({
      name: req.body.name,
      price: req.body.price,
      role: req.body.role,
      description: req.body.description,
      category: req.body.category,
    });
    await newPost.save();
    await user.posts.push(newPost);
    await user.save();
    res.locals.postId = newPost._id;
    next();
  } catch (err) {
    console.log(err.message);
  }
};

exports.addedPost = async (req, res, next) => {
  if (res.locals.number == 0) {
    res.render("notfound", {
      id: res.locals.id,
    });
  } else {
    const post = res.locals.data;
    const user = await User.findById(res.locals.id);
    res.render("ad-post", {
      post,
      id: res.locals.id,
      pic: user.photo,
    });
  }
  next();
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.locals.len = posts.length;
    res.locals.data = posts;
    next();
  } catch (error) {
    res.json(error.message);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.id);
    res.locals.number = user.posts.length;
    res.locals.data = user.posts;
    next();
  } catch (error) {
    res.json(error.message);
  }
};

exports.getPostsOfUser = async (req, res, next) => {
  try {
    //building query
    const queryObj = { ...req.query };
    const query = Post.find(queryObj);

    //execute query
    const posts = await query;
    res.locals.number = posts.length;
    res.locals.data = posts;
    // res.status(200).json({
    //   status: "success",
    //   results: posts.length,
    //   data: {
    //     posts,
    //   },
    // });
    next();
  } catch (err) {
    console.log(err.message);
  }
};

exports.uploadPhotos = (req, res, next) => {
  this.upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      const user = await User.findById(res.locals.id);
      const post = await Post.findById(req.query.post);
      req.files.forEach((file) => {
        // user.posts;
        post.image.push(file.filename);
      });
      await post.save();
      // await user.save();
    }
  });
  next();
};