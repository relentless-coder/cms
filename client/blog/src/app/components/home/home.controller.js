function homeController($localStorage){
  const ctrl = this;
  ctrl.$onInit = function(){
    if($localStorage.user){
      ctrl.about = $localStorage.user.about;
    }
  }
}

export {homeController}
