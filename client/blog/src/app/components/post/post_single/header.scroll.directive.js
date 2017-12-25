function scrollHide($window, $document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $document.on('scroll', ()=>{
                if($window.scrollY > 900){
                    angular.element(element).addClass('hide')
                    angular.element(document.querySelector('.single_post_content_wrapper')).addClass('no_z_index')
                } else {
                    angular.element(element).removeClass('hide')
                    angular.element(document.querySelector('.single_post_content_wrapper')).removeClass('no_z_index')                    
                }
            })
        }
    }
}

export {scrollHide}