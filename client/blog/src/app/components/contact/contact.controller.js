function contactController(contactFactory){
  const ctrl = this;
  if(!$('.view-section').hasClass('opaque')){
    $('.view-section').addClass('opaque');
  }
  ctrl.contact = function(){
    contactFactory.contact(ctrl.user).then((data)=>{
      console.log(data);
    })
  }
}

export {contactController}
