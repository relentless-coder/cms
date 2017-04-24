function headerController(userFactory){
  const ctrl = this;
  ctrl.$onInit = function(){
    userFactory.getUserInfo().then((data)=>{
      ctrl.user = data.data;
    })
  }
}

export {headerController}
