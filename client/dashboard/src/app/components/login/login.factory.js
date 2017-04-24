export const loginFactory = 'loginFactory';

export const loginFactoryFunc = function($http){
  return {
    loginUser: function(value){
      return $http.post('/admin/login', value)
    }
  }
}
