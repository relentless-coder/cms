function headerController(userFactory){
  const ctrl = this;
  ctrl.$onInit = function(){
    userFactory.getUserInfo().then((data)=>{
      console.log(data);
      ctrl.user = data.data.user;
    })
  }
}

export {headerController}
