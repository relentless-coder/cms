export const userFactory = 'userFactory';
export const userFactoryFunc = function($http){
  return {
    getUserInfo: function(){
      return $http.get('/user')
    }
  }
}
