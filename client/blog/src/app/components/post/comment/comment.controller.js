function commentController($stateParams, commentFactory, $rootScope){
  const ctrl = this;
  const host = window.location.host;
  const path = window.location.pathname;
  
  ctrl.comment = {};
  ctrl.reply = {};

  ctrl.postComment = function(){
    const socket = io(host, {
      query: path
    });
    commentFactory.postComment($stateParams.url, ctrl.comment).then((data)=>{
      socket.emit('blog-comment', {
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
