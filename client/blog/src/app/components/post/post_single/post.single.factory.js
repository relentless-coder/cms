export const postSingleFactory = 'postSingleFactory'
export const postSingleFactoryFunc = function($http){
  return {
    getPost: function(value){
      return $http.get(`/post/${value}`)
    }
  }
}
