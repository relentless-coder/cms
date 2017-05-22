export const notifsFactory = 'notifsFactory';
export const notifsFactoryFunc = function($http){
    return {
        getNotifs: function(){
            return $http.get('/notifs')
        }
    }
}