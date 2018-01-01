function showHeader() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$('.nav-wrapper.fixed_nav').length) {
                    $('html,body').animate({
                        scrollTop: $('.nav-wrapper').offset().top
                    }, 1100);
                    $('.profile-wrapper, .name-wrapper, .social-wrapper').animate({
                        opacity: 0
                    }, 1200, () => {
                        $('.header').addClass('hide');
                        $('.nav-wrapper').addClass('fixed_nav')
                        $('html').scrollTop(0);
                    })
                }
            })
        }
    }
}

export { showHeader }
