function showHeader($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                if (!$('.nav-wrapper.fixed_nav').length) {
                    $('.header').animate({
                        opacity: 0
                    }, 500, ()=>{
                      $('.header').addClass('hide');
                      $('.nav-wrapper').addClass('fixed_nav')
                      $('.view-section').addClass('opaque');
                    });
                } else {
                  $('.view-section').addClass('opaque');
                }
                return false
            })
        }
    }
}

export { showHeader }
