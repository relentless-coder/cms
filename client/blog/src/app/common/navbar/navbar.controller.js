function navbarController($localStorage){
    const ctrl = this;
    ctrl.navs = [];
    ctrl.$onInit = function(){
        if($localStorage.user){
            $localStorage.user.navs.forEach(el => ctrl.navs.push({
              name: el,
              status: el.toLowerCase()
            }))
        }
    }
}

export {navbarController}
