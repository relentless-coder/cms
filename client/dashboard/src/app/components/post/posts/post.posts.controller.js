import {getPosts, getPostsFunc} from './post.posts.factory';

export function allPostsController(getPosts, $state){
  const ctrl = this;
  ctrl.$onInit = function(){
    getPosts.allPosts().then((data)=>{
      ctrl.posts = data.data.posts;
      console.log(ctrl.posts);
    }, (err)=>{
      console.log(err.status, err.message);
    })
  }
}
