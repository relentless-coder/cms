function postsController($localStorage, postsFactory) {
  const ctrl = this;
  ctrl.$onInit = function() {

    postsFactory.getPosts().then((data) => {
      ctrl.posts = data.data.posts;
      console.log(ctrl.posts);
    })



  }
}

export {
  postsController
}