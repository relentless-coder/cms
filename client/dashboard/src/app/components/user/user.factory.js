export const userFactory = 'userFactory';
export const userFactoryFunc = function($http, $localStorage){
  return {
    getUser: function(){
      return $http.get('/admin/user');
    },
    storeUser: function(value){
      $localStorage.user = value;
    },
    editUser: function editUser(value) {
      return $http.put('/admin/user', value)
    }
  }
}
