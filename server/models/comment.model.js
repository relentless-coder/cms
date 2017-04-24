import mongoose from 'mongoose';
import express from 'express';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    name: String,
    email: String
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
