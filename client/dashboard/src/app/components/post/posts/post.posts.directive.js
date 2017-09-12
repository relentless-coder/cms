export function togglePost(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      element.on('click', ()=>{
        $('.post-item').addClass('hide');
        let id = $(element).attr('id');
        $(`.post-item.${id}`).removeClass('hide');
      })
    }
  }
}