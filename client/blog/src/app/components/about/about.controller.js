function aboutController(userFactory, $localStorage, $rootScope){
  const ctrl = this;
  ctrl.$onInit = function(){
      userFactory.getUserInfo().then((data)=>{
        ctrl.about = data.data.user.about;
      });
      setTimeout(function () {
        $('.home').animate({
          opacity: 1
        }, 'fast')
      }, 1000);
  }
}

export {aboutController}
