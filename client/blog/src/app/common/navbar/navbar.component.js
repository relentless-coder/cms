import {navbarController} from './navbar.controller.js'

export const navComponent = 'navComponent';
export const navComponentOptions = {
    templateUrl: 'blog/src/app/common/navbar/navbar.html',
    controller: ['$localStorage', navbarController],
    controllerAs: 'ctrl'
}