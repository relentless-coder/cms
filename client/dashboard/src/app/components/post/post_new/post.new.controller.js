import {thisPost, thisPostFunc} from './post.new.factory';

function postNewController(thisPost, $http){
  'ngInject';
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
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    // Note: In modern browsers input[type="file"] is functional without
    // even adding it to the DOM, but that might not be the case in some older
    // or quirky browsers like IE, so you might want to add it to the DOM
    // just in case, and visually hide it. And do not forget do remove it
    // once you do not need it anymore.

    input.onchange = function() {
      var file = this.files[0];

      // Note: Now we need to register the blob in TinyMCEs image blob
      // registry. In the next release this part hopefully won't be
      // necessary, as we are looking to handle it internally.
      var id = 'blobid' + (new Date()).getTime();
      var blobCache = tinymce.activeEditor.editorUpload.blobCache;
      var blobInfo = blobCache.create(id, file);
      blobCache.add(blobInfo);

      // call the callback and populate the Title field with the file name
      cb(blobInfo.blobUri(), { title: file.name });
    };

    input.click();
  }
}
  ctrl.postImage = false;
  ctrl.post = {};
  ctrl.heading = 'Create A New Post';
  ctrl.createPost = function(value){
    thisPost.createPost(value).then((data)=>{
      console.log(`After blog post the response is`, data);
    }, (err)=>{
      console.log(err.status);
    })
  }
}

export {postNewController}
