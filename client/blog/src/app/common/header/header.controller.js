function headerController(userFactory, $localStorage){
  const ctrl = this;
  ctrl.$onInit = function(){
    if($localStorage.user){
      ctrl.user = $localStorage.user;
    } else {
       userFactory.getUserInfo().then((data)=>{
        console.log(data);
        ctrl.user = data.data.user;
        $localStorage.user = data.data.user;
      });
    }
  };
}

export {headerController}
