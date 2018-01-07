function aboutController(userFactory, $localStorage, $rootScope){
  const ctrl = this;
  ctrl.$onInit = function(){
    if(!$('.view-section').hasClass('opaque')){
        $('.view-section').addClass('opaque')
    }
      userFactory.getUserInfo().then((data)=>{
        ctrl.about = data.data.user.about;
        $rootScope.meta.title = 'About | Ayush Bahuguna'
      });
  }
}

export {aboutController}
