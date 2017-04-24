import {loginController} from './login.controller'

export const loginComponent = 'loginComponent';
export const loginOptions = {
  templateUrl: '/dashboard/src/app/components/login/login.html',
  controller: ['loginFactory', 'tokenFactory', '$state', '$rootScope', loginController],
  controllerAs: 'ctrl'
}
