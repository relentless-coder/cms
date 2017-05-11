function hideHeader(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.on('click', ()=>{
                document.querySelector('.header').classList.add('zero_height')
                setTimeout(function(){
                    document.querySelector('.nav-wrapper').classList.add('fixed_nav')
                }, 500)
            })
        }
    }
}

export {hideHeader}