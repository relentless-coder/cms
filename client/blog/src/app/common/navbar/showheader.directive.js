function showHeader(){
    return  {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.on('click', function(){
                document.querySelector('.header').classList.remove('zero_height');
                document.querySelector('.posts').classList.remove('hide');
                setTimeout(()=>{
                    document.querySelector('.nav-wrapper').classList.remove('fixed_nav')
                }, 500)
            })
        }
    }
}

export {showHeader}