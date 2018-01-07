function headerController(userFactory, $localStorage, $state){
  const ctrl = this;

  ctrl.$onInit = function(){
       if($state.current.name === '' || $state.current.name === 'about'){
         $('.header').removeClass('hide')
       }
       userFactory.getUserInfo().then((data)=>{
        ctrl.user = data.data.user;
      });
  };
}

export {headerController}
