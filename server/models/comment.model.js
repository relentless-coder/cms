import mongoose from 'mongoose';
import express from 'express';
import Post from './post.model';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    name: String,
    email: String
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  comment: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

export default mongoose.model('Comment', commentSchema);
