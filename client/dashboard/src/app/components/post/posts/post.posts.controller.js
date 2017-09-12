export function allPostsController(getPosts, $state, tokenFactory){
  const ctrl = this;
  ctrl.$onInit = function(){
   if(tokenFactory.findToken()){
     ctrl.isLoggedIn = true;
   }
   if(!tokenFactory.findToken()){
      $state.go('login');
    };
    getPosts.allPosts().then((data)=>{
      ctrl.posts = data.data;
    }, (err)=>{
      console.log(err.status, err.error.message);
    })
  }
}
