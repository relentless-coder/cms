function userController(Upload, userFactory, $localStorage){
  const ctrl = this;
  ctrl.tinymceOptions = {
    theme: 'modern',
    plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
    ],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',

  };

  ctrl.editUser = function(){
    if(typeof ctrl.user.navs === String){
      const arr = ctrl.user.navs.split(',');
      ctrl.user.navs = arr;
    }
    Upload.upload({
      url: '/admin/user',
      data: {file: ctrl.profile, user: ctrl.user},
      method: 'PUT'
    }).then((data)=>{
      console.log(data);
    }, (err)=>{
      console.log(err);
    });
  };

  ctrl.$onInit = function init() {
    if($localStorage.user){
      ctrl.user = $localStorage.user;
    } else {
      userFactory.getUser().then((data)=>{
        console.log(data);
      })
    }
  }
}

export {userController}
