function postSingleController(postSingleFactory, $stateParams, $rootScope) {
  const ctrl = this;
  ctrl.$onInit = function () {
    $('.nav-wrapper').addClass('fixed_nav')
    document.querySelector('.posts').classList.add('hide');
    postSingleFactory.getPost($stateParams.url).then((data) => {
      ctrl.post = data.data.post;
      ctrl.post.comments.forEach(el => el.replyVisible = false);
      ctrl.content = ctrl.post.content;
      $rootScope.meta = ctrl.post.meta;
    })
  }

  $rootScope.$on('commented', () => {
    postSingleFactory.getPost($stateParams.url).then((data) => {
      ctrl.post = data.data.post;
    })
  })
}

export { postSingleController }
