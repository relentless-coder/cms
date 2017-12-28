function showHeader() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$('.nav-wrapper.fixed_nav').length) {
                    $('html,body').animate({
                        scrollTop: $('.view-section').offset().top
                    }, 1100);
                    $('.profile-wrapper, .name-wrapper, .social-wrapper').animate({
                        opacity: 0
                    }, 1200, () => {
                        $('.header').addClass('hide');
                        $('html, body').addClass('no_flow');
                        $('.view-section').addClass('so_flow');
                        $('.nav-wrapper').addClass('fixed_nav')
                    })
                }
            })
        }
    }
}

export { showHeader }