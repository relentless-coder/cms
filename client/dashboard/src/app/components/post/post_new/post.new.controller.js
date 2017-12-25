import {thisPost, thisPostFunc} from './post.new.factory';

function postNewController(thisPost, $http, $state){
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
    image_title: true,
  // enable automatic uploads of images represented by blob or data URIs
  automatic_uploads: true,
  // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
  images_upload_url: '/post/images',
  // here we add custom filepicker only to Image dialog
  file_picker_types: 'image',
  // and here's our custom image picker
  file_picker_callback: function(cb, value, meta) {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = function() {
      let file = this.files[0];

      /*
      Note: Now we need to register the blob in TinyMCEs image blob
      registry.
      */
      let id = 'blobid' + (new Date()).getTime();
      let blobCache = tinymce.activeEditor.editorUpload.blobCache;
      let blobInfo = blobCache.create(id, file);
      blobCache.add(blobInfo);

      // call the callback and populate the Title field with the file name
      cb(blobInfo.blobUri(), { title: file.name });
    };

    input.click();
  }
}
  ctrl.postImage = false;
  ctrl.post = {};
  ctrl.meta = {};
  ctrl.heading = 'Create A New Post';
  ctrl.createPost = function(query){
    ctrl.meta.keywords = ctrl.meta.keywords.split(',');
    ctrl.post.meta = ctrl.meta;
    thisPost.createPost(ctrl.post, query).then((data)=>{
      $state.go('home');
    }, (err)=>{
      console.log(err.status);
    })
  }
}

export {postNewController}
