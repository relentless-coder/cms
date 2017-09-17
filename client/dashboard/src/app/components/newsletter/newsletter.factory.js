export const newsFactory = 'newsFactory'

export const newsFactoryFunc = function ($http) {
  return {
    createNews: function (value) {
      return $http.post('/news', value)
    }
  }
}