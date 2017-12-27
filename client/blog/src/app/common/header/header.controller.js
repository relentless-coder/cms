function headerController(userFactory, $localStorage, $state){
  const ctrl = this;

  ctrl.$onInit = function(){
       console.log("hello world");
       if($state.current.name === 'home' || $state.current.name === 'about'){
         $('.header').removeClass('hide')
       }
       userFactory.getUserInfo().then((data)=>{
        ctrl.user = data.data.user;
      });
  };
}

export {headerController}
