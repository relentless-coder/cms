import mongoose from 'mongoose';
import Comment from './comment.model';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  gallery: Array,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  draft: Boolean,
  created: {
    type: Date,
    default: new Date()
  },
  url: String
});
export default mongoose.model('Post', postSchema);
