function highlightDirective(hljsService, $window) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.singlePostContent, function (content) {
        if (content) {
          element.html(content);
          let codeBlocks = element.find('code');
          console.log(codeBlocks);
          let service = $window.hljs || hljsService;
          for(let key in codeBlocks){
            if(codeBlocks[key]){
              service.highlightBlock(codeBlocks[key]);              
            }
          }
        }else {
          element.html('');
        }
      });
    }
  }
}

export {highlightDirective}