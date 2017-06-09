import express from 'express';
import bodyParser from 'body-parser';
import Post from '../models/post.model';
import Comment from '../models/comment.model';
import {decode} from '../config/jwt.token.js';
const sanitizer = require('sanitize-html');



const app = express();
const router = express.Router();

router.get('/admin/comment', (req, res) => {
	if (!req.headers.authorization) {
		res.status(401).json({ message: "You are not logged in" })
	}
	const token = req.headers.authorization.split(' ')[1];
	const payload = decode(token, 'inav');
	if (payload._id) {
		Comment.find({}).populate({path: 'post', model: 'Post', select: 'title'}).exec((err, comments) => {
			if (err || !comments) {
				console.log(err);
				res.status(404).json({ message: err })
			} else {
				console.log(comments)
				res.status(200).json({ data: comments });
			}
		})
	} else {
		console.log("Did not find the payload")
		res.status(404).json({ message: 'User not found' })
	}
})

router.get('/admin/comment/:id', (req, res)=>{
	if(!req.headers.authorization){
		res.status(401).json({message: "You are not logged in"})
	}

	const token = req.headers.authorization.split(' ')[1];
	const payload = decode(token, 'inav');
	if(payload._id){
		Comment.findOne({_id: req.params.id}).populate({path: 'post', model: 'Post', select: 'title'}).exec((err, foundComment)=>{
			if(err || !foundComment){
				res.status(404).json({message: err})
			} else {
				res.status(200).json({data: foundComment});
			}
		})
	} else {
		res.status(404).json({message: "User not found"});
	}
})

router.delete('/admin/comment/:id', (req, res)=>{
	if(!req.headers.authorization){
    	return res.status(401).json({message: 'You are not logged in'})
  	}
	Post.findOne({'comments._id': req.params.id}, (err, foundPost)=>{
		if(err){
			res.status(404).json(err);
		}
		const index = foundPost.comments.indexOf(req.params.id);
		foundPost.comments.splice(index, 1);
		foundPost.save((err, data)=>{
			Comment.remove({_id: req.params.id}, (err, result)=>{
				res.status(200).json({message: "Comment deleted"})
			})
		})
	})
})

router.post('/:url/comment', (req, res) => {
	req.body.comment = sanitizer(req.body.comment);
	Comment.create(req.body, (err, createdCom) => {
		err ? console.log(err) : Post.findOne({ url: req.params.url }, (err, foundPost) => {
			if (err) {
				res.status(404).json({ message: "Post not found" })
			}
			createdCom.post = foundPost._id;
			foundPost.comments.push(createdCom._id);
			foundPost.save();
			createdCom.postId = foundPost._id;
			res.status(200).json({ message: "Comment saved" });
		})
	})
})

router.post('/comment/:commentId', (req, res) => {
	req.body.comment = sanitizer(req.body.comment);
	Comment.create(req.body, (err, createdCom) => {
		err ? res.json({ error: 'message' }) : Comment.findById(req.params.commentId, (err, foundComment) => {
			foundComment.comments.push(createdCom._id);
			foundComment.save();
			res.json({ message: "Comment reply saved" })
		})
	})
})

export default router;
