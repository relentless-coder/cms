import express from 'express';
import mongoose from 'mongoose';
import Post from './server/models/post.model';
import Comment from './server/models/comment.model';

let posts = [{
    title: "Test Post1",
    content: "This is a test post and I'll be really happy if this shows up on the test page.\n And one more thing where do I sign up for social skills, man I really don't have any. I don't know maybe I am talking just gibberish",
    author: "Chacha Guldaar",
    url: 'test-post1'
}, {
    title: "Test Post2",
    content: "This is another test post and let's be honest it is going to show up on the test page, because I wrote this, unlike Chacha Guldaar.\n And one more thing where do I sign up for teaching social skills, because I gotta be honest, i have a river flowing in me.",
    author: "Fufa Jaandar",
    url: 'test-post2'
}, {
    title: "Test Post3",
    content: "This is the last test post on this fun typing session and I don't want to sound cocky, but this will certainly will show up on the test page, because I wrote this unlike the Fufa Jamaadar up above.\n All you people will bow down to me, and I wil laugh at you and your fear.",
    author: "Ayush Bahuguna",
    url: "test-post3"
}];

function seedDb(){
    Comment.remove({}, (err)=>{
      console.log(err);
    })
    Post.remove({}, (err)=>{
        err ? res.json({message: err}) : posts.forEach((seed)=>{
            Post.create(seed, (err, postCreated)=>{
                console.log(postCreated);
            });
        });
    });
}

export default seedDb;
