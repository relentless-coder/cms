function highlightDirective(hljsService, $window) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.singlePostContent, function (content) {
        if (content) {
          element.html(content);
          console.log(element.find('pre')[0]);
          let service = $window.hljs || hljsService;
          service.highlightBlock(element.find('code')[0]);        
        }else {
          element.html('');
        }
      });
    }
  }
}

export {highlightDirective}