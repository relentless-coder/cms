function homeController($localStorage){
  const ctrl = this;
  ctrl.$onInit = function(){
    
      ctrl.about = $localStorage.user.about;
  }
}

export {homeController}
