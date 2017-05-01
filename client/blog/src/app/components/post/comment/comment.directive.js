function showReply(){
  return {
    restrict: 'A',
    scope: {
      collapsed: '='
    },
    link: function(scope, element, attrs){
      element.on('click', ()=>{
        console.log(`Show reply scope.replyVisible is ${scope.collapsed}`);
        console.log(typeof scope.collapsed);
        scope.collapsed = true;
        console.log(`Show reply scope.replyVisible is after ${scope.collapsed}`);
        scope.$apply()
    })
    }
  }
}

function hideReply(){
  return {
    restrict: 'A',
    scope: {
      collapsed: '='
    },
    link: function(scope, element, attrs){
      element.on('click', ()=>{
        console.log(`Hide reply scope.replyVisible is ${scope.collapsed}`);
        scope.collapsed = false;
        console.log(`Hide reply scope.replyVisible is ${scope.collapsed}`);
        scope.$apply()
     })
    }
  }
}

export {showReply, hideReply}
