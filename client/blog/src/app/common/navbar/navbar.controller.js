function navbarController($localStorage, $state){
    const ctrl = this;
    ctrl.navs = [];
    ctrl.$onInit = function(){
        if($state.current.name === 'about' || $state.current.name === 'articles' || $state.current.name === 'articles.single' || $state.current.name === 'contact')
          $('.nav-wrapper').addClass('fixed_nav')
        if($localStorage.user){
            $localStorage.user.navs.forEach(el => ctrl.navs.push({
              name: el,
              status: el.toLowerCase()
            }))
        }
    }
}

export {navbarController}
