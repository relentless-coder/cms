function postsController($localStorage){
  const ctrl = this;
  ctrl.$onInit = function(){
    if($localStorage.user){
      ctrl.posts = $localStorage.user.posts;
    }
  }
}

export {postsController}
