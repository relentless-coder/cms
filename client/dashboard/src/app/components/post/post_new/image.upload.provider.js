export const imageUpload = 'imageUpload'
export const imageUploadFunction = function(){
  this.$get = function($http){
    function imageHandler(image){
      console.log("You've reached the upload provider")
      $http.post('/post/images', image).then((data)=>{
        console.log(data);
      })
    }
    return {
      imageHandler: imageHandler
    }
  }
}
