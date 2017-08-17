export const tokenFactory = 'tokenFactory';
export const tokenFactoryFunc = function($localStorage){
  return {
    setToken: function(value){
      $localStorage.token = value;
    },
    getToken: function(){
      return $localStorage.token;
    },
    findToken: function(){
      if($localStorage.token){
        return true;
      }
    },
    deleteToken: function(){
      delete $localStorage.token;
    }
  }
}
