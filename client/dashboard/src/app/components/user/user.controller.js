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
  ctrl.upload = function upload($file) {
    Upload.upload({
      url: '/user/picture',
      file: $file
    }).then((data)=>{
      console.log(data);
    }, (err)=>{
      console.log(err);
    });
  };

  ctrl.editUser = function(){
    const arr = ctrl.user.navs.split(',');
    ctrl.user.navs = arr;
    userFactory.editUser(ctrl.user).then((data)=>{
      console.log(data);
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
