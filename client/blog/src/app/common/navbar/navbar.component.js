import {navbarController} from './navbar.controller.js'

export const navComponent = 'navComponent';
export const navComponentOptions = {
    templateUrl: 'blog/src/app/common/navbar/navbar.html',
    controller: ['$localStorage', '$state', navbarController],
    controllerAs: 'ctrl'
}
