function signupController(signupFactory, tokenFactory, $state, $rootScope){
    const ctrl = this;
    ctrl.user = {};
    ctrl.signupUser = function(){
      signupFactory.signupUser(ctrl.user).then((data)=>{
        ctrl.user = {};
        console.log(data);
        tokenFactory.setToken(data.data.token);
        $rootScope.$broadcast('userLoggedIn')
        $state.go('home');
      }, (err)=>{
        console.log(err);
      })
    }
  }
  
  export {signupController}