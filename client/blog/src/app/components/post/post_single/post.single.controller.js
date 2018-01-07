function postSingleController(postSingleFactory, $stateParams, $rootScope) {
  const ctrl = this;
  ctrl.$onInit = function () {
    document.querySelector('.posts').classList.add('hide');
    postSingleFactory.getPost($stateParams.url).then((data) => {
      ctrl.post = data.data.post;
      ctrl.post.comments.forEach(el => el.replyVisible = false);
      ctrl.content = ctrl.post.content;
      ctrl.post.meta.keywords = ctrl.post.meta.keywords.join(',');
      $rootScope.meta = ctrl.post.meta;
      $rootScope.meta.title = `${ctrl.post.title} | Ayush Bahuguna`;
    })
  }

  $rootScope.$on('commented', () => {
    postSingleFactory.getPost($stateParams.url).then((data) => {
      ctrl.post = data.data.post;
    })
  })
}

export { postSingleController }
