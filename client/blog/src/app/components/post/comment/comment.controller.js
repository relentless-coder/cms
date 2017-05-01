function commentController($stateParams, commentFactory, $rootScope){
  const ctrl = this;
  ctrl.comment = {};
  ctrl.reply = {};
  ctrl.decision = {};
  ctrl.$onInit = function(){
    ctrl.decision = {
      replyVisible: false
    }
  }

  ctrl.showReply = function(){
    ctrl.replyVisible = true;
  }

  ctrl.logReply = ()=>{
    console.log(ctrl.decision.replyVisible)
  }

  ctrl.cancelReply = function(){
    ctrl.comment = {};
    ctrl.replyVisible = false;
  }
  ctrl.postComment = function(){
    commentFactory.postComment($stateParams.url, ctrl.comment).then((data)=>{
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
