function postSingleController(postSingleFactory, $stateParams, $rootScope) {
  const ctrl = this;
  ctrl.$onInit = function () {
    document.querySelector('.header').classList.add('zero_height')
    document.querySelector('.posts').classList.add('hide');
    setTimeout(function () {
      document.querySelector('.nav-wrapper').classList.add('fixed_nav')
    }, 500)
    postSingleFactory.getPost($stateParams.url).then((data) => {
      ctrl.post = data.data.post;
      ctrl.post.comments.forEach(el => el.replyVisible = false);
    })
  }

  $rootScope.$on('commented', () => {
    postSingleFactory.getPost($stateParams.url).then((data) => {
      ctrl.post = data.data.post;
    })
  })
}

export { postSingleController }
