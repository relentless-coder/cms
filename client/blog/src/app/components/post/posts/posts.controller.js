function postsController($localStorage, postsFactory, $rootScope, $state) {
  const ctrl = this;
  ctrl.$onInit = function() {
    if(!$('.view-section').hasClass('opaque')){
      $('.view-section').addClass('opaque');
    }
    postsFactory.getPosts().then((data) => {
      $rootScope.posts = data.data.published;
    })

  }
}

export {
  postsController
}
