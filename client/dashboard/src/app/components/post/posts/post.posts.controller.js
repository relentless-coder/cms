import {getPosts, getPostsFunc} from './post.posts.factory';

export function allPostsController(getPosts, $state, tokenFactory){
  const ctrl = this;
  console.log(ctrl);
  console.log(this);
  ctrl.$onInit = function(){
   if(!tokenFactory.findToken()){
     $state.go('login')
   }
    getPosts.allPosts().then((data)=>{
      ctrl.posts = data.data.posts;
      console.log(ctrl.posts);
    }, (err)=>{
      console.log(err.status, err.message);
    })
  }
}
