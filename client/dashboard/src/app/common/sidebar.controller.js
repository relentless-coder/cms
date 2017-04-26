function sidebarController(tokenFactory, $state, $rootScope){
  var ctrl = this;
  ctrl.items = [{name: 'Home', icon: 'home', status: 'home'}, {name: 'New Post', icon: 'note_add', status: 'new'}, {name: 'Profile', icon: 'person', status: 'profile'}];
  ctrl.logout = function(){
    tokenFactory.deleteToken();
    ctrl.isLoggedIn = tokenFactory.findToken();
    $state.go('login')
  }

  ctrl.$onInit = function(){
    ctrl.isLoggedIn = tokenFactory.findToken();
  }

  $rootScope.$on('userLoggedIn', function(){
    ctrl.isLoggedIn = tokenFactory.findToken();
  })

}

export {sidebarController};
