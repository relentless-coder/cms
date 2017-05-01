import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import Post from '../models/post.model';
import User from '../models/user.model'
import {decode} from '../config/jwt.token.js';

const sanitizer = require('sanitize-html');
const sanitizeOpt = {
    allowedTags: [ 'img', 'p' ],
    allowedSchemes: [ 'data', 'http' ]
}

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
const upload = multer({storage: storage});
// Home page route

router.get('/post', (req, res)=>{
    Post.find({}, (err, allPosts)=>{
    err ? res.json(null) : res.json({
      posts: allPosts
    });
  });
});

// Post route to submit new posts
router.post('/post', (req, res)=>{
  if(!req.headers.authorization){
    return res.status(401).json({message: 'You are not logged in'})
  }
  const token = req.headers.authorization.split(' ')[1];
  const payload = decode(token, 'inav');
  console.log(`Payload is ${payload}`);
  req.body.content = sanitizer(req.body.content, sanitizeOpt);
  req.body.url = req.body.title.replace(/ /g, "-");
  Post.create(req.body, (err, data)=>{
    err ? console.log(err) : Post.findOne({url: req.body.url}, (err, foundPost)=>{
      User.findById(payload._id, (err, user)=>{
        user.posts.push(foundPost._id);
        user.save();
      })
      return res.json({message: "Post created successfully"})
    });
  });
});

// Get route for showing the full blog post
router.get('/post/:url', (req, res)=>{
  Post.findOne({url: req.params.url}).populate({path: 'comments', model: 'Comment', populate: {
    path: 'comments',
    model: 'Comment'
  }}).exec((err, foundPost)=>{
      console.log(foundPost);
        err ? res.json({error: 'message'}) : res.json({post: foundPost});
    }) 
});

router.put('/post/:url', (req, res)=>{
  console.log(req.body);
  Post.update({url: req.params.url}, req.body, (err, foundPost)=>{
    if(err){
      res.json({message: err});
    }
    Post.find({url: req.params.url}, (err, updatedPost)=>{
      res.json({post: updatedPost});
    })
  });
});

router.post('/post/images/', upload.single('file'), (req, res, next)=>{
  console.log("Image api hit");
  const location = req.file.path.replace(/uploads/, '');
  res.json({'location': location});
  console.log(`image saved to location`);
})



export default router;
