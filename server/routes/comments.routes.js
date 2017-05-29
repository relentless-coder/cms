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
				res.status(404).json({ msg: err })
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

router.post('/:url/comment/:commentId', (req, res) => {
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
