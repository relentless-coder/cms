import {userController} from './user.controller';

export const userComponent = 'userComponent';
export const userComponentOptions = {
  templateUrl: '/dashboard/src/app/components/user/user.html',
  controller: ['Upload', 'userFactory', '$localStorage', userController],
  controllerAs: 'ctrl'
}
