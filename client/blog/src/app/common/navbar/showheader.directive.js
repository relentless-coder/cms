function showHeader($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                e.preventDefault();
                if (!$('.nav-wrapper.fixed_nav').length) {
                    $('html,body').animate({
                        scrollTop: $('.nav-wrapper').offset().top
                    }, 'slow', ()=>{
                      $('.header').addClass('hide');
                      $('.nav-wrapper').addClass('fixed_nav')
                      $('html').scrollTop(0);
                      $('.view-section').addClass('opaque');
                    });
                } else {
                  $('.view-section').addClass('opaque');
                }
            })
        }
    }
}

export { showHeader }
