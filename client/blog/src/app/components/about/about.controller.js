function aboutController(userFactory, $localStorage, $rootScope){
  const ctrl = this;
  ctrl.$onInit = function(){  
      userFactory.getUserInfo().then((data)=>{
        ctrl.about = data.data.user.about;
      });
  }
}

export {aboutController}
