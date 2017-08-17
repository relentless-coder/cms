import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import mailer from 'nodemailer';
import Post from '../models/post.model';
import User from '../models/user.model';
import Subscriber from '../models/subscriber.model';
import { decode } from '../config/jwt.token.js';
import { config } from '../config/package-config';


const sanitizer = require('sanitize-html');
const sanitizeOpt = {
  allowedTags: ['img', 'p', 'pre', 'code'],
  allowedSchemes: ['data', 'http']
}

let transport = mailer.createTransport({
  host: config.host,
  port: config.port,
  secure: true,
  auth: {
    user: config.mailUser,
    pass: config.mailPass
  }
})

const app = express();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  }
});

const upload = multer({ storage: storage });
// Home page route

router.get('/post', (req, res) => {
  Post.find({}, (err, allPosts) => {
    err ? res.json(null) : res.json({
      posts: allPosts
    });
  });
});

// Post route to submit new posts
router.post('/post', (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'You are not logged in' })
  }
  const payload = decode(req);
  req.body.content = sanitizer(req.body.content, sanitizeOpt);
  req.body.url = req.body.title.replace(/ /g, '-');
  Post.create(req.body)
    .then((data) => {
      Post.findOne({ url: req.body.url })
        .then((foundPost) => {
          User.findById(payload._id)
            .then((user) => {
              user.posts.push(foundPost._id);
              user.save((err, success)=>{
                if(err){
                  console.log(err)
                } else {
                console.log('post saved')
                res.status(200).json({ message: 'Post created successfully', post: foundPost })              
                }
              });
            })
        });
    }).catch((err) => {
      res.status(500).json({ message: 'Oh, oh. I couldn\'t create your post' })
    });
});

// Get route for showing the full blog post
router.get('/post/:url', (req, res) => {
  Post.findOne({ url: req.params.url }).populate({
    path: 'comments', model: 'Comment', populate: {
      path: 'comments',
      model: 'Comment'
    }
  }).exec((err, foundPost) => {
    console.log(foundPost);
    err ? res.status(200).json({ error: 'message' }) : res.json({ post: foundPost });
  })
});

router.put('/post/:url', (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'You are not logged in' })
  }
  const payload = decode(req);
  Post.update({ url: req.params.url }, req.body, (err, foundPost) => {
    if (err) {
      res.status(422).json({ message: err });
    }
    Post.findOne({ url: req.params.url }, (err, updatedPost) => {
      console.log(updatedPost);
      res.status(200).json({ post: updatedPost });
    })
  });
});

router.post('/post/images/', upload.single('file'), (req, res, next) => {
  const location = req.file.path.replace(/uploads/, '');
  res.json({ 'location': location });
})



export default router;
