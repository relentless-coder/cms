import mongoose from 'mongoose';
import Post from './post.model';
import Comment from './comment.model';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	email: String,
	password: String,
	domain: String,
	about: String,
	github: String,
	twitter: String,
	profession: String,
	navs: Array,
	profileImage: String
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(user, password) {
	return bcrypt.compareSync(password, user.password);
};

export default mongoose.model('User', userSchema)