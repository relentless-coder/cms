import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import User from '../models/user.model';
import {decode} from '../config/jwt.token.js'

const app = express();

const router = express.Router();

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'uploads');
	},
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + '.png')
	}
})

const upload = multer({storage: storage})

router.post('/user/picture', upload.single('file'), (req, res, next)=>{

	if(!req.headers.authorization){
		res.status(401).json({message: "You are not logged in"})
	}

	const token = req.headers.authorization.split(' ')[1];
	const payload = decode(token, 'inav');
	if(payload._id){
		User.findById(payload._id, (err, foundUser)=>{
			if(foundUser){
				const location = req.file.path.replace('uploads', '');
				foundUser.profileImage = location;
				foundUser.save();
				res.status(200).json({message: "Profile Image Uploaded"})
			}
		})
	}
})

router.get('/admin/user', (req, res)=>{
	if(!req.headers.authorization){
		res.status(401).json({message: "You are not logged in"})
	}
	const token = req.headers.authorization.split(' ')[1];
	const payload = decode(token, 'inav');
	if(payload._id){
		User.findById(payload._id, (err, foundUser)=>{
			res.status(200).json({user: foundUser})
		})
	}
})

router.get('/user', (req, res)=>{
		User.find({}, (err, foundUser)=>{
			const modUser = foundUser[0].toObject();
			delete modUser.password
			res.status(200).json({user: modUser})
		})
})

router.put('/user', (req, res)=>{
	if(!req.headers.authorization){
		res.status(401).json({message: "You are not logged in"})
	}
	const token = req.headers.authorization.split(' ')[1];
	const payload = decode(token, 'inav');
	if(payload._id){
		User.update({_id: payload._id}, req.body, (err, success)=>{
			err ? res.status(422).json({message: err}) : User.findById(payload._id, (err, foundUser)=>{
				res.status(200).json({message: "User updated successfully", user: foundUser})
			})
		})
	}

})



export default router;
