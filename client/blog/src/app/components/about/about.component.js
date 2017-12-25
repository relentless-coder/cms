import {aboutController} from './about.controller'

export const aboutComponent = 'aboutComponent'
export const aboutComponentOptions = {
  templateUrl: 'blog/src/app/components/about/about.html',
  controller: ['userFactory', '$localStorage', aboutController],
  controllerAs: 'ctrl'
}
