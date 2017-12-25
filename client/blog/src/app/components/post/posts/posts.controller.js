function postsController($localStorage, postsFactory, $rootScope) {
  const ctrl = this;
  ctrl.$onInit = function() {

    postsFactory.getPosts().then((data) => {
      $rootScope.posts = data.data.published;
    })

  }
}

export {
  postsController
}