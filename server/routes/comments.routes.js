import express from 'express';
import bodyParser from 'body-parser';
import Post from '../models/post.model';
import Comment from '../models/comment.model';
import { decode } from '../config/jwt.token.js';
const sanitizer = require('sanitize-html');

const app = express();
const router = express.Router();

/*

	 d888b   d88888b d888888b       .o88b.  .d88b.  .88b  d88. .88b  d88. d88888b d888888b .d8888. 
	88' Y8b 88'     `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88'YbdP`88 88'     `~~88~~' 88'  YP 
	88      88ooooo    88         8P      88    88 88  88  88 88  88  88 88ooooo    88    `8bo.   
	88  ooo 88~~~~~    88         8b      88    88 88  88  88 88  88  88 88~~~~~    88      `Y8b. 
	88. ~8~ 88.        88         Y8b  d8 `8b  d8' 88  88  88 88  88  88 88.        88    db   8D 
	 Y888P   Y88888P   YP          `Y88P'  `Y88P'  YP  YP  YP YP  YP  YP Y88888P    YP    `8888Y' 
																								
								
*/

router.get('/admin/comment', (req, res) => {
	if (!req.headers.authorization) {
		res.status(401).json({ message: "You are not logged in" })
	}
	const payload = decode(req);
	if (payload._id) {
		Comment.find({}).populate({ path: 'post', model: 'Post', select: 'title' }).exec((err, comments) => {
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

/*
	
	 d888b  d88888b  d888888b       .o88b.  .d88b.  .88b  d88. .88b  d88. d88888b d8b   db d888888b 
	88' Y8b 88'     `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88'YbdP`88 88'     888o  88 `~~88~~' 
	88      88ooooo    88         8P      88    88 88  88  88 88  88  88 88ooooo 88V8o 88    88    
	88  ooo 88~~~~~    88         8b      88    88 88  88  88 88  88  88 88~~~~~ 88 V8o88    88    
	88. ~8~ 88.        88         Y8b  d8 `8b  d8' 88  88  88 88  88  88 88.     88  V888    88    
	 Y888P  Y88888P    YP          `Y88P'  `Y88P'  YP  YP  YP YP  YP  YP Y88888P VP   V8P    YP    
																								
																																																													
*/

router.get('/admin/comment/:id', (req, res) => {
	if (!req.headers.authorization) {
		res.status(401).json({ message: "You are not logged in" })
	}

	const payload = decode(req);
	if (payload._id) {
		Comment.findOne({ _id: req.params.id }).populate({ path: 'post', model: 'Post', select: 'title' }).exec((err, foundComment) => {
			if (err || !foundComment) {
				res.status(404).json({ message: err })
			} else {
				res.status(200).json({ data: foundComment });
			}
		})
	} else {
		res.status(404).json({ message: "User not found" });
	}
})

/*


	d8888b. d88888b db      d88888b d888888b d88888b       .o88b.  .d88b.  .88b  d88. .88b  d88. d88888b d8b   db d888888b 
	88  `8D 88'     88      88'     `~~88~~' 88'          d8P  Y8 .8P  Y8. 88'YbdP`88 88'YbdP`88 88'     888o  88 `~~88~~' 
	88   88 88ooooo 88      88ooooo    88    88ooooo      8P      88    88 88  88  88 88  88  88 88ooooo 88V8o 88    88    
	88   88 88~~~~~ 88      88~~~~~    88    88~~~~~      8b      88    88 88  88  88 88  88  88 88~~~~~ 88 V8o88    88    
	88  .8D 88.     88booo. 88.        88    88.          Y8b  d8 `8b  d8' 88  88  88 88  88  88 88.     88  V888    88    
	Y8888D' Y88888P Y88888P Y88888P    YP    Y88888P       `Y88P'  `Y88P'  YP  YP  YP YP  YP  YP Y88888P VP   V8P    YP    
                                                                                                                       
                                                                                                                       

 */

router.delete('/admin/comment/:id', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'You are not logged in' })
	}
	Post.findOne({ 'comments._id': req.params.id }, (err, foundPost) => {
		if (err) {
			res.status(404).json(err);
		}
		const index = foundPost.comments.indexOf(req.params.id);
		foundPost.comments.splice(index, 1);
		foundPost.save((err, data) => {
			Comment.remove({ _id: req.params.id }, (err, result) => {
				res.status(200).json({ message: "Comment deleted" })
			})
		})
	})
})

/*

	d8888b.  .d88b.  .d8888. d888888b       .o88b.  .d88b.  .88b  d88. .88b  d88. d88888b d8b   db d888888b 
	88  `8D .8P  Y8. 88'  YP `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88'YbdP`88 88'     888o  88 `~~88~~' 
	88oodD' 88    88 `8bo.      88         8P      88    88 88  88  88 88  88  88 88ooooo 88V8o 88    88    
	88~~~   88    88   `Y8b.    88         8b      88    88 88  88  88 88  88  88 88~~~~~ 88 V8o88    88    
	88      `8b  d8' db   8D    88         Y8b  d8 `8b  d8' 88  88  88 88  88  88 88.     88  V888    88    
	88       `Y88P'  `8888Y'    YP          `Y88P'  `Y88P'  YP  YP  YP YP  YP  YP Y88888P VP   V8P    YP    
																											
																											

*/

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

/*

	d8888b. d88888b d8888b. db      db    db       .o88b.  .d88b.  .88b  d88. .88b  d88. d88888b d8b   db d888888b 
	88  `8D 88'     88  `8D 88      `8b  d8'      d8P  Y8 .8P  Y8. 88'YbdP`88 88'YbdP`88 88'     888o  88 `~~88~~' 
	88oobY' 88ooooo 88oodD' 88       `8bd8'       8P      88    88 88  88  88 88  88  88 88ooooo 88V8o 88    88    
	88`8b   88~~~~~ 88~~~   88         88         8b      88    88 88  88  88 88  88  88 88~~~~~ 88 V8o88    88    
	88 `88. 88.     88      88booo.    88         Y8b  d8 `8b  d8' 88  88  88 88  88  88 88.     88  V888    88    
	88   YD Y88888P 88      Y88888P    YP          `Y88P'  `Y88P'  YP  YP  YP YP  YP  YP Y88888P VP   V8P    YP    
                                                                                                               
                                                                                                               

*/

router.post('/comment/:commentId', (req, res) => {
	if (req.headers.authorization) {
		const payload = decode(req);
		User.findById(payload._id, (err, foundUser) => {
			const author = {
				name: foundUser.name,
				email: foundUser.email
			}
			req.body.author = author;
		})
	}

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
