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
  
  const sortPosts = (posts) =>{
    let data = {
      draft: [],
      published: []
    };
    posts.forEach((el)=>{
      if(el.draft === true){
        console.log('got him');
        data.draft.push(el)
      } else {
        data.published.push(el)
      }
    })

    console.log(data);

    res.status(200).json(data)
  }

  Post.find({})
    .then(sortPosts)
    .catch((err)=>{
      res.status(500).json({err: {code: 500, message: 'There is something wrong, please try again or contact our support.', devErr: err}})
    })
});

// Post route to submit new posts
router.post('/post', (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'You are not logged in' })
  }
  const payload = decode(req);
  req.body.content = sanitizer(req.body.content, sanitizeOpt);
  req.body.url = req.body.title.replace(/ /g, '-');
  req.body.draft = req.query.draft;
  Post.create(req.body)
    .then((data) => {
      res.status(200).json({ message: 'Post created successfully', post: data})
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
  req.body.draft = req.query.draft;
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
