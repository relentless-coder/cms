function contactController(contactFactory){
  const ctrl = this;
  ctrl.contact = function(){
    contactFactory.contact(ctrl.user).then((data)=>{
      console.log(data);
    })
  }
}

export {contactController}
