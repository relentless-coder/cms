function scrollHide($window, $document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $document.on('scroll', ()=>{
                console.log($window.scrollY)
                if($window.scrollY > 900){
                    angular.element(element).addClass('hide')
                } else {
                    angular.element(element).removeClass('hide')
                }
            })
        }
    }
}

export {scrollHide}