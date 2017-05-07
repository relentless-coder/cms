function postsController($localStorage){
  const ctrl = this;
  ctrl.$onInit = function(){
    if($localStorage.user){
      ctrl.posts = $localStorage.user.posts;
      ctrl.posts.forEach((el)=>{
        el.comments.forEach((comment)=>{
          comment.replyVisible = false;
        })
      })
    }
  }
}

export {postsController}
