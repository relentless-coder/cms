export const contactFactory = 'contactFactory'
export const contactFactoryFunc = function($http){
  return {
    contact: function(value){
      return $http.post('/contact', value)
    }
  }
}
