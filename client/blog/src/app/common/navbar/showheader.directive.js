function showHeader($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$('.nav-wrapper.fixed_nav').length) {
                    $('html,body').animate({
                        scrollTop: $('.nav-wrapper').offset().top
                    }, 1100, ()=>{
                      $('.header').addClass('hide');
                      $('.nav-wrapper').addClass('fixed_nav')
                      $('html').scrollTop(0);
                      $('.view-section').addClass('opaque');
                    });
                } else {
                  $timeout(()=>{
                    $('.view-section').addClass('opaque');
                  }, 300)
                }
            })
        }
    }
}

export { showHeader }
