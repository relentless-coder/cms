function commentController($stateParams, commentFactory, $rootScope){
  const ctrl = this;
  const host = window.location.href;
  const socket = io(host);
  ctrl.comment = {};
  ctrl.reply = {};

  ctrl.postComment = function(){
    commentFactory.postComment($stateParams.url, ctrl.comment).then((data)=>{
      socket.emit('comment', {
        name: ctrl.comment.author.name,
        comment: ctrl.comment.comment  
      })
      ctrl.comment = {};
      $rootScope.$emit('commented')
    })
  }

  ctrl.re = function(value){
    commentFactory.reply($stateParams.url,  value, ctrl.reply).then((data)=>{
      ctrl.reply = {};
      $rootScope.$emit('commented');
    })
  }
}

export {commentController}
