webpackJsonp([0],Array(18).concat([
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tokenFactory = exports.tokenFactory = 'tokenFactory';
var tokenFactoryFunc = exports.tokenFactoryFunc = function tokenFactoryFunc($localStorage) {
  return {
    setToken: function setToken(value) {
      $localStorage.token = value;
      console.log($localStorage.token);
    },
    getToken: function getToken() {
      return $localStorage.token;
    },
    findToken: function findToken() {
      if ($localStorage.token) {
        return true;
      }
    },
    deleteToken: function deleteToken() {
      delete $localStorage.token;
    }
  };
};

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getPosts = exports.getPosts = 'getPosts';
var getPostsFunc = exports.getPostsFunc = function getPostsFunc($http) {
  return {
    allPosts: function allPosts() {
      return $http.get('/post');
    }
  };
};

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
function sidebarController(tokenFactory, $state, $rootScope, notifsFactory) {
  var ctrl = this;
  ctrl.trivial = {};
  var host = window.location.host;
  var path = window.location.pathname;
  var socket = io(host, {
    query: path
  });

  socket.on('comment-posted', function (msg) {
    var span = document.createElement('span');
    var text = document.createTextNode(msg.name + ' commented');
    span.appendChild(text);
    document.getElementById('comments').appendChild(span);
  });
  ctrl.items = [{ name: 'Home', icon: 'home', status: 'home' }, { name: 'New Post', icon: 'note_add', status: 'new' }, { name: 'Profile', icon: 'person', status: 'profile' }];
  ctrl.logout = function () {
    tokenFactory.deleteToken();
    ctrl.isLoggedIn = tokenFactory.findToken();
    $state.go('login');
  };

  ctrl.$onInit = function () {
    if (!tokenFactory.findToken()) {
      $state.go('login');
    };
    if (tokenFactory.findToken()) {
      ctrl.isLoggedIn = true;
    }
    notifsFactory.getNotifs().then(function (data) {
      ctrl.trivial.count = data.data.notifs.length;
      if (ctrl.trivial.count > 0) {
        $('.notification_count').removeClass('hide');
      }
      console.log(data);
    });
  };

  $rootScope.$on('userLoggedIn', function () {
    ctrl.isLoggedIn = tokenFactory.findToken();
  });
}

exports.sidebarController = sidebarController;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var thisPost = exports.thisPost = 'thisPost';

var thisPostFunc = exports.thisPostFunc = function thisPostFunc($http) {
  return {
    createPost: function createPost(value) {
      console.log(value);
      return $http.post('/post', value);
    }
  };
};

/***/ }),
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sidebar = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

__webpack_require__(26);

var _notifs = __webpack_require__(100);

var _showComments = __webpack_require__(102);

var _tokenFactory = __webpack_require__(18);

var _notifs2 = __webpack_require__(101);

var _sidebar = __webpack_require__(103);

var _sidebar2 = __webpack_require__(63);

__webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sidebar = exports.sidebar = _angular2.default.module('sidebar', [_angularUiRouter2.default, 'ngStorage']).component(_sidebar.sidebarComponentName, _sidebar.sidebarComponent).directive('removeNotifs', _notifs.removeNotifs).factory(_tokenFactory.tokenFactory, ['$localStorage', _tokenFactory.tokenFactoryFunc]).factory(_notifs2.notifsFactory, ['$http', _notifs2.notifsFactoryFunc]).directive('showComments', _showComments.showComments).name;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.components = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _post = __webpack_require__(117);

var _loginModule = __webpack_require__(116);

var _userModule = __webpack_require__(132);

var _comment = __webpack_require__(104);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = exports.components = _angular2.default.module('components', [_post.post, _loginModule.login, _userModule.user, _comment.comment]).name;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var rootComponentName = exports.rootComponentName = 'root';
var rootComponent = exports.rootComponent = {
  templateUrl: '/dashboard/src/app/root.html'
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
function removeNotifs() {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            element.on('click', function () {
                $(element).removeClass('you_got_mail');
                $(element > '.notification_count').addClass('hide');
            });
        }
    };
}

exports.removeNotifs = removeNotifs;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var notifsFactory = exports.notifsFactory = 'notifsFactory';
var notifsFactoryFunc = exports.notifsFactoryFunc = function notifsFactoryFunc($http) {
    return {
        getNotifs: function getNotifs() {
            return $http.get('/notifs');
        }
    };
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
function showComments() {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            element.on('click', function () {
                $('.comments').removeClass('hide');
            });
        }
    };
}

exports.showComments = showComments;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sidebarComponent = exports.sidebarComponentName = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _sidebar = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sidebarComponentName = exports.sidebarComponentName = 'sidebar';
var sidebarComponent = exports.sidebarComponent = {
  templateUrl: '/dashboard/src/app/common/sidebar.html',
  controller: ['tokenFactory', '$state', '$rootScope', 'notifsFactory', _sidebar.sidebarController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _comments = __webpack_require__(112);

var _comment_single = __webpack_require__(108);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comment = exports.comment = _angular2.default.module('comment', [_comments.comments, _comment_single.comment_single]).name;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.singleCommentComponentOptions = exports.singleCommentComponent = undefined;

var _comment_single = __webpack_require__(106);

var singleCommentComponent = exports.singleCommentComponent = 'singleCommentComponent';
var singleCommentComponentOptions = exports.singleCommentComponentOptions = {
    templateUrl: '/dashboard/src/app/components/comment/comment_single/comment_single.html',
    controller: ['singleCommentFactory', '$stateParams', _comment_single.singleCommentController]
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
function singleCommentController(singleCommentFactory, $stateParams) {
    var ctrl = this;
    ctrl.reply = {};
    ctrl.$onInit = function () {
        singleCommentFactory.getComment($stateParams.id).then(function (data) {
            ctrl.comment = data.data.data;
            console.log(data);
            $('.comments').addClass('hide');
        });
    };

    ctrl.replyComment = function (id) {
        singleCommentFactory.replyComment(ctrl.reply, id).then(function (data) {
            ctrl.reply = {};
        });
    };
}

exports.singleCommentController = singleCommentController;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var singleCommentFactory = exports.singleCommentFactory = 'singleCommentFactory';

var singleCommentFactoryFunction = exports.singleCommentFactoryFunction = function singleCommentFactoryFunction($http) {
    return {
        getComment: function getComment(value) {
            return $http.get('/admin/comment/' + value);
        },
        replyComment: function replyComment(value, id) {
            return $http.post('/comment/' + id);
        }
    };
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.comment_single = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _comment_single = __webpack_require__(105);

var _comment_single2 = __webpack_require__(107);

__webpack_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comment_single = exports.comment_single = _angular2.default.module('comment_single', [_angularUiRouter2.default]).component(_comment_single.singleCommentComponent, _comment_single.singleCommentComponentOptions).factory(_comment_single2.singleCommentFactory, ['$http', _comment_single2.singleCommentFactoryFunction]).config(['$stateProvider', function ($stateProvider) {
	var singleState = {
		name: 'comments.comment',
		url: '/:id',
		component: _comment_single.singleCommentComponent
	};
	$stateProvider.state(singleState);
}]).name;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.commentComponentOptions = exports.commentComponent = undefined;

var _comments = __webpack_require__(110);

var commentComponent = exports.commentComponent = 'commentComponent';
var commentComponentOptions = exports.commentComponentOptions = {
    templateUrl: '/dashboard/src/app/components/comment/comments/comments.html',
    controller: ['commentsFactory', _comments.commentsController],
    controllerAs: 'ctrl'
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
function commentsController(commentsFactory) {
    var ctrl = this;
    ctrl.$onInit = function () {
        commentsFactory.getComments().then(function (el) {
            ctrl.comments = el.data.data;
            $('.comments').removeClass('hide');
            console.log(ctrl.comments);
        });
    };

    ctrl.deleteComment = function (value) {
        commentsFactory.deleteComment(value).then(function (data) {
            commentsFactory.getComments().then(function (el) {
                ctrl.comments = el.data;
            });
        });
    };
}

exports.commentsController = commentsController;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var commentsFactory = exports.commentsFactory = 'commentsFactory';
var commentsFactoryFunc = exports.commentsFactoryFunc = function commentsFactoryFunc($http) {
    return {
        getComments: function getComments() {
            return $http.get('/admin/comment');
        },
        deleteComment: function deleteComment(value) {
            return $http.delete('/admin/comment/' + value);
        }
    };
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comments = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _comments = __webpack_require__(111);

var _comments2 = __webpack_require__(109);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comments = exports.comments = _angular2.default.module('comments', [_angularUiRouter2.default]).component(_comments2.commentComponent, _comments2.commentComponentOptions).factory(_comments.commentsFactory, ['$http', _comments.commentsFactoryFunc]).config(['$stateProvider', function ($stateProvider) {
  var commentsState = {
    name: 'comments',
    url: '/admin/comments',
    component: _comments2.commentComponent
  };

  $stateProvider.state(commentsState);
}]).name;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginOptions = exports.loginComponent = undefined;

var _login = __webpack_require__(114);

var loginComponent = exports.loginComponent = 'loginComponent';
var loginOptions = exports.loginOptions = {
  templateUrl: '/dashboard/src/app/components/login/login.html',
  controller: ['loginFactory', 'tokenFactory', '$state', '$rootScope', _login.loginController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function loginController(loginFactory, tokenFactory, $state, $rootScope) {
  var ctrl = this;
  ctrl.user = {};
  ctrl.$onInit = function () {
    ctrl.isLoggedIn = tokenFactory.findToken();
  };
  ctrl.loginUser = function () {
    loginFactory.loginUser(ctrl.user).then(function (data) {
      ctrl.user = {};
      console.log(data);
      tokenFactory.setToken(data.data.token);
      $rootScope.$broadcast('userLoggedIn');
      $state.go('home');
    }, function (err) {
      console.log(err);
    });
  };
}

exports.loginController = loginController;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var loginFactory = exports.loginFactory = 'loginFactory';

var loginFactoryFunc = exports.loginFactoryFunc = function loginFactoryFunc($http) {
  return {
    loginUser: function loginUser(value) {
      return $http.post('/admin/login', value);
    }
  };
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

__webpack_require__(26);

var _login = __webpack_require__(115);

var _token = __webpack_require__(18);

var _login2 = __webpack_require__(113);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = _angular2.default.module('login', [_angularUiRouter2.default, 'ngStorage']).config(['$stateProvider', function ($stateProvider) {
  var loginState = {
    name: 'login',
    url: '/admin/login',
    component: _login2.loginComponent
  };

  $stateProvider.state(loginState);
}]).component(_login2.loginComponent, _login2.loginOptions).factory(_login.loginFactory, ['$http', _login.loginFactoryFunc]).factory(_token.tokenFactory, ['$localStorage', _token.tokenFactoryFunc]).name;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _postNewModule = __webpack_require__(120);

var _postPostsModule = __webpack_require__(128);

var _postSingleModule = __webpack_require__(124);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var post = exports.post = _angular2.default.module('post', [_postNewModule.newPost, _postPostsModule.posts, _postSingleModule.postSingle]).name;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postNewComponent = exports.postNewOptions = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _postNew = __webpack_require__(119);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postNewOptions = exports.postNewOptions = {
  templateUrl: 'dashboard/src/app/components/post/post_new/post.new.html',
  controller: _postNew.postNewController,
  controllerAs: 'ctrl'
};

var postNewComponent = exports.postNewComponent = 'postNew';

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postNewController = undefined;

var _postNew = __webpack_require__(64);

function postNewController(thisPost, $http) {
  'ngInject';

  var ctrl = this;

  ctrl.tinymceOptions = {
    theme: 'modern',
    plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'],
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
    file_picker_callback: function file_picker_callback(cb, value, meta) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      /* Note: In modern browsers input[type="file"] is functional without
         even adding it to the DOM, but that might not be the case in some older
         or quirky browsers like IE, so you might want to add it to the DOM
         just in case, and visually hide it. And do not forget do remove it
         once you do not need it anymore.
      */
      input.onchange = function () {
        var file = this.files[0];

        /*
        Note: Now we need to register the blob in TinyMCEs image blob
        registry.
        */
        var id = 'blobid' + new Date().getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var blobInfo = blobCache.create(id, file);
        blobCache.add(blobInfo);

        // call the callback and populate the Title field with the file name
        cb(blobInfo.blobUri(), { title: file.name });
      };

      input.click();
    }
  };
  ctrl.postImage = false;
  ctrl.post = {};
  ctrl.heading = 'Create A New Post';
  ctrl.createPost = function (value) {
    thisPost.createPost(value).then(function (data) {
      console.log('After blog post the response is', data);
    }, function (err) {
      console.log(err.status);
    });
  };
}

exports.postNewController = postNewController;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newPost = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _postNew = __webpack_require__(64);

var _postNew2 = __webpack_require__(118);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newPost = exports.newPost = _angular2.default.module('post.new', [_angularUiRouter2.default, 'ui.tinymce']).component(_postNew2.postNewComponent, _postNew2.postNewOptions).config(['$stateProvider', function ($stateProvider) {
  var newState = {
    name: 'new',
    url: '/admin/new',
    component: _postNew2.postNewComponent
  };

  $stateProvider.state(newState);
}]).factory(_postNew.thisPost, ['$http', _postNew.thisPostFunc]).name;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSingleOptions = exports.postSingleComponent = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _postSingle = __webpack_require__(122);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postSingleComponent = exports.postSingleComponent = 'postSingleComponent';
var postSingleOptions = exports.postSingleOptions = {
  templateUrl: 'dashboard/src/app/components/post/post_single/post.single.html',
  controller: ['postSingleFactory', 'postUpdateFactory', '$stateParams', _postSingle.postSingleController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSingleController = undefined;

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function postSingleController(postSingleFactory, postUpdateFactory, $stateParams) {
  var ctrl = this;
  ctrl.$onInit = function () {
    postSingleFactory.getSinglePost($stateParams.url).then(function (data) {
      ctrl.post = data.data.post;
    }, function (err) {
      console.log(err);
    });
  };

  ctrl.tinymceOptions = {
    theme: 'modern',
    plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'],
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
    file_picker_callback: function file_picker_callback(cb, value, meta) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      // Note: In modern browsers input[type="file"] is functional without
      // even adding it to the DOM, but that might not be the case in some older
      // or quirky browsers like IE, so you might want to add it to the DOM
      // just in case, and visually hide it. And do not forget do remove it
      // once you do not need it anymore.

      input.onchange = function () {
        var file = this.files[0];

        // Note: Now we need to register the blob in TinyMCEs image blob
        // registry. In the next release this part hopefully won't be
        // necessary, as we are looking to handle it internally.
        var id = 'blobid' + new Date().getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var blobInfo = blobCache.create(id, file);
        blobCache.add(blobInfo);

        // call the callback and populate the Title field with the file name
        cb(blobInfo.blobUri(), { title: file.name });
      };

      input.click();
    }
  };

  ctrl.updatePost = function (url, value) {
    postUpdateFactory.updatePost(url, value).then(function (data) {
      postSingleFactory.getSinglePost(url).then(function (data) {
        ctrl.post = data.data.post[0];
      });
    }, function (err) {
      console.log(err);
    });
  };
}

exports.postSingleController = postSingleController;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var postSingleFactory = exports.postSingleFactory = 'postSingleFactory';
var postSingleFactoryFunc = exports.postSingleFactoryFunc = function postSingleFactoryFunc($http, $stateParams) {
  return {
    getSinglePost: function getSinglePost(value) {
      return $http.get('/post/' + value);
    }
  };
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSingle = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _postSingle = __webpack_require__(121);

var _postSingle2 = __webpack_require__(123);

var _postUpdate = __webpack_require__(125);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postSingle = exports.postSingle = _angular2.default.module('postSingle', [_angularUiRouter2.default, 'ui.tinymce']).component(_postSingle.postSingleComponent, _postSingle.postSingleOptions).config(function ($stateProvider) {
  var editState = {
    url: '/admin/edit/:url',
    name: 'edit',
    component: _postSingle.postSingleComponent
  };
  $stateProvider.state(editState);
}).factory(_postSingle2.postSingleFactory, ['$http', _postSingle2.postSingleFactoryFunc]).factory(_postUpdate.postUpdateFactory, ['$http', _postUpdate.postUpdateFactoryFunc]).name;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var postUpdateFactory = exports.postUpdateFactory = 'postUpdateFactory';
var postUpdateFactoryFunc = exports.postUpdateFactoryFunc = function postUpdateFactoryFunc($http) {
  return {
    updatePost: function updatePost(url, value) {
      return $http.put('/post/' + url, value);
    }
  };
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPostsOptions = exports.allPostsComponent = undefined;

var _postPosts = __webpack_require__(35);

var _postPosts2 = __webpack_require__(127);

var allPostsComponent = exports.allPostsComponent = 'allPosts';
var allPostsOptions = exports.allPostsOptions = {
  templateUrl: '/dashboard/src/app/components/post/posts/post.posts.html',
  controller: [_postPosts.getPosts, '$state', 'tokenFactory', _postPosts2.allPostsController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPostsController = allPostsController;

var _postPosts = __webpack_require__(35);

function allPostsController(getPosts, $state, tokenFactory) {
  var ctrl = this;
  console.log(ctrl);
  console.log(this);
  ctrl.$onInit = function () {
    if (tokenFactory.findToken()) {
      ctrl.isLoggedIn = true;
    }
    if (!tokenFactory.findToken()) {
      $state.go('login');
    };
    getPosts.allPosts().then(function (data) {
      ctrl.posts = data.data.posts;
      console.log(ctrl.posts);
    }, function (err) {
      console.log(err.status, err.message);
    });
  };
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.posts = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _angularSanitize = __webpack_require__(91);

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

__webpack_require__(26);

var _postPosts = __webpack_require__(35);

var _postPosts2 = __webpack_require__(126);

var _tokenFactory = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var posts = exports.posts = _angular2.default.module('post.posts', [_angularUiRouter2.default, _angularSanitize2.default, 'ngStorage']).component(_postPosts2.allPostsComponent, _postPosts2.allPostsOptions).config(function ($stateProvider, $urlRouterProvider) {
  var homeState = {
    name: 'home',
    url: '/admin/home',
    component: _postPosts2.allPostsComponent
  };
  $stateProvider.state(homeState);
  $urlRouterProvider.when('/admin/', '/admin/home');
}).factory(_postPosts.getPosts, ['$http', _postPosts.getPostsFunc]).factory(_tokenFactory.tokenFactory, ['$localStorage', _tokenFactory.tokenFactoryFunc]).name;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userComponentOptions = exports.userComponent = undefined;

var _user = __webpack_require__(130);

var userComponent = exports.userComponent = 'userComponent';
var userComponentOptions = exports.userComponentOptions = {
  templateUrl: '/dashboard/src/app/components/user/user.html',
  controller: ['Upload', 'userFactory', '$localStorage', _user.userController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function userController(Upload, userFactory, $localStorage) {
  var ctrl = this;
  ctrl.tinymceOptions = {
    theme: 'modern',
    plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample'

  };

  ctrl.editUser = function () {
    Upload.upload({
      url: '/admin/user',
      data: { file: ctrl.profile, user: ctrl.user },
      method: 'PUT'
    }).then(function (data) {
      console.log(data);
    }, function (err) {
      console.log(err);
    });
  };

  ctrl.$onInit = function init() {
    if ($localStorage.user) {
      ctrl.user = $localStorage.user;
    } else {
      userFactory.getUser().then(function (data) {
        console.log(data);
      });
    }
  };
}

exports.userController = userController;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var userFactory = exports.userFactory = 'userFactory';
var userFactoryFunc = exports.userFactoryFunc = function userFactoryFunc($http, $localStorage) {
  return {
    getUser: function getUser() {
      return $http.get('/admin/user');
    },
    storeUser: function storeUser(value) {
      $localStorage.user = value;
    },
    editUser: function editUser(value) {
      return $http.put('/admin/user', value);
    }
  };
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _ngFileUpload = __webpack_require__(138);

var _ngFileUpload2 = _interopRequireDefault(_ngFileUpload);

__webpack_require__(26);

var _userFactory = __webpack_require__(131);

var _userComponent = __webpack_require__(129);

__webpack_require__(136);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = exports.user = _angular2.default.module('user', [_angularUiRouter2.default, _ngFileUpload2.default, 'ngStorage']).component(_userComponent.userComponent, _userComponent.userComponentOptions).config(['$stateProvider', function ($stateProvider) {
  var profileState = {
    name: 'profile',
    url: '/admin/profile',
    component: _userComponent.userComponent
  };
  $stateProvider.state(profileState);
}]).factory(_userFactory.userFactory, ['$http', _userFactory.userFactoryFunc]).name;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(6);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _sidebar = __webpack_require__(66);

var _component = __webpack_require__(67);

var _root = __webpack_require__(68);

var _tokenFactory = __webpack_require__(18);

__webpack_require__(69);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.module('cms', [_sidebar.sidebar, _component.components, _angularUiRouter2.default, 'ngStorage']).component(_root.rootComponentName, _root.rootComponent).config(function ($locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
}).run([_tokenFactory.tokenFactory, '$http', function (tokenFactory, $http) {
  if (tokenFactory.findToken()) {
    var token = tokenFactory.getToken();
    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
  }
}]).name;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ })
]),[133]);