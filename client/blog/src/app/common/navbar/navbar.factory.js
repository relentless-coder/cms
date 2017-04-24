export const navFactory = 'navFactory';
export const navFactoryFunc = function($http){
  return {
    getNavs: function(){
      return $http.get('/blog/settings')
    }
  }
}
