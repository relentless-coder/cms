function removeNotifs(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', ()=>{
               $(element).removeClass('you_got_mail');
               $(element > '.notification_count').addClass('hide');
            })
        }
    }
}

export {removeNotifs}