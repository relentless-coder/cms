function showHeader() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$('.nav-wrapper.fixed_nav').length) {
                    $('html, body').animate({
                        scrollTop: $('.view-section').offset().top - 60
                    }, 1100);
                    $('.profile-wrapper, .name-wrapper, .social-wrapper').animate({
                        opacity: 0
                    }, 1200, () => {
                        $('.header').addClass('hide');
                        $('html, body').scrollTop(0);
                        $('.nav-wrapper').addClass('.fixed_nav')
                    })
                }
            })
        }
    }
}

export { showHeader }