function postSingleController(postSingleFactory, $stateParams, $rootScope){
  const ctrl = this;
  ctrl.$onInit = function(){
    postSingleFactory.getPost($stateParams.url).then((data)=>{
      console.log(data);
      ctrl.post = data.data.post;
      ctrl.post.comments.forEach(el => el.replyVisible = false)
    })
  }

  $rootScope.$on('commented', ()=>{
    postSingleFactory.getPost($stateParams.url).then((data)=>{
      console.log(data);
      ctrl.post = data.data.post;
    })
  })
}

export {postSingleController}
