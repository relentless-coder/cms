function headerController(userFactory, $localStorage){
  const ctrl = this;
  ctrl.$onInit = function(){
       userFactory.getUserInfo().then((data)=>{
        ctrl.user = data.data.user;
      });
  };
}

export {headerController}
