function showComments(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.on('click', ()=>{
                $('.comments').removeClass('hide');
            })
        }
    }
}

export {showComments}