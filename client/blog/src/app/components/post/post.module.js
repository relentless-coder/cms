import {posts} from './posts/posts.module.js'
import {post_single} from './post_single/post.single.module'
import {comment} from './comment/comment.module'

export const post = angular.module('post', [posts, post_single, comment])
.name
