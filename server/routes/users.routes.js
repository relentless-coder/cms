import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import User from '../models/user.model';
import Subscriber from '../models/subscriber.model';
import { decode } from '../config/jwt.token.js'

let notifs = [];

const app = express();

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if(!file){
			return;
		}
		cb(null, 'uploads');
	},
	filename: function (req, file, cb) {
		if(!file){
			return;
		}
		cb(null, file.fieldname + '-' + Date.now() + '.png')
	}
});

const upload = multer({ storage: storage })

router.get('/admin/user', (req, res) => {
	if (!req.headers.authorization) {
		res.status(401).json({ message: 'You are not logged in' })
	}
	
	const payload = decode(req);
	
	if (payload._id) {
		User.findById(payload._id)
			.populate({ path: 'posts', model: 'Post' })
			.exec((err, user) => {
				err ? console.log(err) : res.status(200).json({ user: user })
			})
	}
});

router.get('/user', (req, res) => {
	User.find({})
		.populate({ path: 'posts', model: 'Post' }).exec((err, user) => {
			err ? console.log(err) : res.status(200).json({ user: user[0] });
		})
});



router.put('/admin/user', upload.single('file'), (req, res, next) => {
	if (!req.headers.authorization) {
		res.status(401).json({ message: 'You are not logged in' })
	}
	const payload = decode(req);
	if (payload._id) {
		User.update({ _id: payload._id }, req.body.user, (err, success) => {
			err ? res.status(422).json({ message: err }) : User.findById(payload._id, (err, foundUser) => {
				if (req.file) {
					const location = req.file.path.replace('uploads', '');
					foundUser.profileImage = location;
					foundUser.save();
				}

				res.status(200).json({ message: 'User updated successfully', user: foundUser })
			});
		});
	}
});

router.get('/notifs', (req, res)=>{
	if (!req.headers.authorization) {
		res.status(401).json({ message: 'You are not logged in' })
	}
	const payload = decode(req);
	if (payload._id) {
		res.status(200).json({notifs: notifs})
		notifs = [];
	} else {
		res.status(404).json({message: 'user doesn\'t exist'})
	}
})

router.post('/contact', (req, res) => {
	User.find({}, (err, users) => {
		const user = users[0];
		user.queries.push(req.body)
		user.save()
		console.log(user);
		res.status(200).json({ message: 'Query submitted' })
	})
})

router.post('/subscribe', (req, res)=>{
	Subscriber.create(req.body).then((data)=>{
		res.status(200).json({message: 'Success'})
	}).catch((err)=>{
		res.status(500).json({message: err})
	})
})

export default router;

function returnNotifs(value){
	notifs.push(value)
}

export {returnNotifs}