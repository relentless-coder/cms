function sidebarController(tokenFactory, $state, $rootScope, notifsFactory){
  const ctrl = this;
    const host = window.location.host;
  const path = window.location.pathname;
       const socket = io(host, {
       query: path
     });
 
  socket.on('comment-posted', (msg)=>{
    console.log(msg);
    const span = document.createElement('span');
    const text = document.createTextNode(`${msg.name} commented`)
    span.appendChild(text)
    document.getElementById('comments').appendChild(span)
  })
  ctrl.items = [{name: 'Home', icon: 'home', status: 'home'}, {name: 'New Post', icon: 'note_add', status: 'new'}, {name: 'Profile', icon: 'person', status: 'profile'}];
  ctrl.logout = function(){
    tokenFactory.deleteToken();
    ctrl.isLoggedIn = tokenFactory.findToken();
    $state.go('login')
  }

  ctrl.$onInit = function(){
    ctrl.isLoggedIn = tokenFactory.findToken();
    notifsFactory.getNotifs().then((data)=>{
      console.log(data);
    })
  }

  $rootScope.$on('userLoggedIn', function(){
    ctrl.isLoggedIn = tokenFactory.findToken();
  })

}

export {sidebarController};
