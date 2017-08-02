webpackJsonp([0],Array(62).concat([
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularSanitize = __webpack_require__(24);

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

__webpack_require__(25);

var _user = __webpack_require__(99);

var _headerComponent = __webpack_require__(97);

__webpack_require__(128);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = exports.header = _angular2.default.module('header', [_angularSanitize2.default, 'ngStorage']).component(_headerComponent.headerComponentName, _headerComponent.headerComponentOptions).factory(_user.userFactory, ['$http', _user.userFactoryFunc]).name;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navbar = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

__webpack_require__(25);

var _navbar = __webpack_require__(100);

var _showheader = __webpack_require__(102);

__webpack_require__(129);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navbar = exports.navbar = _angular2.default.module('navbar', ['ngStorage']).component(_navbar.navComponent, _navbar.navComponentOptions).directive('showHeader', _showheader.showHeader).name;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optin = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _optin = __webpack_require__(103);

var _optin2 = __webpack_require__(105);

__webpack_require__(130);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optin = exports.optin = _angular2.default.module('optin', []).component(_optin.optinComponent, _optin.optinComponentOptions).factory(_optin2.optinFactory, _optin2.optinFactoryFunction).name;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.components = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _home = __webpack_require__(112);

var _contact = __webpack_require__(109);

var _post = __webpack_require__(118);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = exports.components = _angular2.default.module('components', [_home.home, _contact.contact, _post.post]).name;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var rootComponentName = exports.rootComponentName = 'root';
var rootComponent = exports.rootComponent = {
  templateUrl: './blog/src/app/root.html'
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 68 */,
/* 69 */,
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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerComponentOptions = exports.headerComponentName = undefined;

var _headerController = __webpack_require__(98);

var headerComponentName = exports.headerComponentName = 'headerComponent';
var headerComponentOptions = exports.headerComponentOptions = {
  templateUrl: 'blog/src/app/common/header/header.html',
  controller: ['userFactory', '$localStorage', _headerController.headerController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function headerController(userFactory, $localStorage) {
  var ctrl = this;
  ctrl.$onInit = function () {
    if ($localStorage.user) {
      ctrl.user = $localStorage.user;
    } else {
      userFactory.getUserInfo().then(function (data) {
        console.log(data);
        ctrl.user = data.data.user;
        $localStorage.user = data.data.user;
      });
    }
  };
}

exports.headerController = headerController;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var userFactory = exports.userFactory = 'userFactory';
var userFactoryFunc = exports.userFactoryFunc = function userFactoryFunc($http) {
  return {
    getUserInfo: function getUserInfo() {
      return $http.get('/user');
    }
  };
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.navComponentOptions = exports.navComponent = undefined;

var _navbarController = __webpack_require__(101);

var navComponent = exports.navComponent = 'navComponent';
var navComponentOptions = exports.navComponentOptions = {
    templateUrl: 'blog/src/app/common/navbar/navbar.html',
    controller: ['$localStorage', _navbarController.navbarController],
    controllerAs: 'ctrl'
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function navbarController($localStorage) {
    var ctrl = this;
    ctrl.navs = [];
    ctrl.$onInit = function () {
        if ($localStorage.user) {
            $localStorage.user.navs.forEach(function (el) {
                return ctrl.navs.push({
                    name: el,
                    status: el.toLowerCase()
                });
            });
        }
    };
}

exports.navbarController = navbarController;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function showHeader() {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            element.on('click', function () {
                document.querySelector('.header').classList.remove('zero_height');
                document.querySelector('.posts').classList.remove('hide');
                setTimeout(function () {
                    document.querySelector('.nav-wrapper').classList.remove('fixed_nav');
                }, 500);
            });
        }
    };
}

exports.showHeader = showHeader;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.optinComponentOptions = exports.optinComponent = undefined;

var _optin = __webpack_require__(104);

var _optin2 = _interopRequireDefault(_optin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optinComponent = exports.optinComponent = 'optin';
var optinComponentOptions = exports.optinComponentOptions = {
	templateUrl: 'blog/src/app/common/optin/optin.html',
	controller: ['optinFactory', _optin2.default],
	controllerAs: 'ctrl'
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function optinFunction(optinFactory) {

	var ctrl = this;
	ctrl.subscriber = {};
	ctrl.info = {};
	ctrl.info.message = 'Hey, if you enjoyed this post, then I can drop you an email everytime I write a new post. Your information will not shared with anyone.';

	ctrl.subscribe = function subscribe() {
		if (ctrl.subscriber) {
			optinFactory.submitOptin(ctrl.subscriber).then(function (data) {
				ctrl.subscriber = {};
				ctrl.info.message = 'Thank you. You\'ll hear from me soon.';
			}).catch(function (err) {
				ctrl.info.message = 'Something went wrong, please try again.';
			});
		} else {
			ctrl.info.message = 'Come on, just two fields.';
		}
	};
}

exports.default = optinFunction;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var optinFactory = exports.optinFactory = 'optinFactory';
var optinFactoryFunction = exports.optinFactoryFunction = function optinFactoryFunction($http) {
	return {
		submitOptin: function submitOptin(user) {
			return $http.post('/subscribe');
		}
	};
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactComponentOptions = exports.contactComponent = undefined;

var _contact = __webpack_require__(107);

var contactComponent = exports.contactComponent = 'contactComponent';
var contactComponentOptions = exports.contactComponentOptions = {
  templateUrl: 'blog/src/app/components/contact/contact.html',
  controller: ['contactFactory', _contact.contactController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function contactController(contactFactory) {
  var ctrl = this;
  ctrl.contact = function () {
    contactFactory.contact(ctrl.user).then(function (data) {
      console.log(data);
    });
  };
}

exports.contactController = contactController;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var contactFactory = exports.contactFactory = 'contactFactory';
var contactFactoryFunc = exports.contactFactoryFunc = function contactFactoryFunc($http) {
  return {
    contact: function contact(value) {
      return $http.post('/contact', value);
    }
  };
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contact = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(9);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _contact = __webpack_require__(108);

var _contact2 = __webpack_require__(106);

__webpack_require__(131);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contact = exports.contact = _angular2.default.module('contact', [_angularUiRouter2.default]).config(['$stateProvider', function ($stateProvider) {
  var contactState = {
    name: 'contact',
    url: '/contact',
    component: _contact2.contactComponent
  };
  $stateProvider.state(contactState);
}]).component(_contact2.contactComponent, _contact2.contactComponentOptions).factory(_contact.contactFactory, ['$http', _contact.contactFactoryFunc]).name;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeComponentOptions = exports.homeComponent = undefined;

var _home = __webpack_require__(111);

var homeComponent = exports.homeComponent = 'homeComponent';
var homeComponentOptions = exports.homeComponentOptions = {
  templateUrl: 'blog/src/app/components/home/home.html',
  controller: ['$localStorage', _home.homeController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function homeController($localStorage) {
  var ctrl = this;
  ctrl.$onInit = function () {

    ctrl.about = $localStorage.user.about;
  };
}

exports.homeController = homeController;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(9);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

__webpack_require__(25);

var _angularSanitize = __webpack_require__(24);

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

var _home = __webpack_require__(110);

__webpack_require__(132);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var home = exports.home = _angular2.default.module('home', ['ngStorage', _angularSanitize2.default, _angularUiRouter2.default]).config(['$stateProvider', function ($stateProvider) {
  var homeState = {
    name: 'home',
    url: '/',
    component: _home.homeComponent
  };

  $stateProvider.state(homeState);
}]).component(_home.homeComponent, _home.homeComponentOptions).name;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentComponentOptions = exports.commentComponent = undefined;

var _comment = __webpack_require__(114);

var commentComponent = exports.commentComponent = 'commentComponent';
var commentComponentOptions = exports.commentComponentOptions = {
  bindings: {
    post: '<'
  },
  templateUrl: 'blog/src/app/components/post/comment/comment.html',
  controller: ['$stateParams', 'commentFactory', '$rootScope', _comment.commentController],
  controllerAs: 'cm'
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function commentController($stateParams, commentFactory, $rootScope) {
  var ctrl = this;
  var host = window.location.host;
  var path = window.location.pathname;
  var socket = io(host, {
    query: path
  });

  ctrl.comment = {};
  ctrl.reply = {};

  ctrl.postComment = function () {
    commentFactory.postComment($stateParams.url, ctrl.comment).then(function (data) {
      socket.emit('blog-comment', {
        name: ctrl.comment.author.name,
        comment: ctrl.comment.comment
      });
      ctrl.comment = {};
      $rootScope.$emit('commented');
    });
  };

  ctrl.re = function (value) {
    commentFactory.reply($stateParams.url, value, ctrl.reply).then(function (data) {
      ctrl.reply = {};
      $rootScope.$emit('commented');
    });
  };
}

exports.commentController = commentController;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function showReply() {
  return {
    restrict: 'A',
    scope: {
      collapsed: '='
    },
    link: function link(scope, element, attrs) {
      element.on('click', function () {
        console.log('Show reply scope.replyVisible is ' + scope.collapsed);
        console.log(_typeof(scope.collapsed));
        scope.collapsed = true;
        console.log('Show reply scope.replyVisible is after ' + scope.collapsed);
        scope.$apply();
      });
    }
  };
}

function hideReply() {
  return {
    restrict: 'A',
    scope: {
      collapsed: '='
    },
    link: function link(scope, element, attrs) {
      element.on('click', function () {
        console.log('Hide reply scope.replyVisible is ' + scope.collapsed);
        scope.collapsed = false;
        console.log('Hide reply scope.replyVisible is ' + scope.collapsed);
        scope.$apply();
      });
    }
  };
}

exports.showReply = showReply;
exports.hideReply = hideReply;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var commentFactory = exports.commentFactory = 'commentFactory';
var commentFactoryFunc = exports.commentFactoryFunc = function commentFactoryFunc($http) {
  return {
    postComment: function postComment(url, value) {
      return $http.post('/' + url + '/comment', value);
    },
    reply: function reply(url, id, value) {
      return $http.post('/' + url + '/comment/' + id, value);
    }
  };
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(9);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _comment = __webpack_require__(115);

var _comment2 = __webpack_require__(116);

var _comment3 = __webpack_require__(113);

__webpack_require__(133);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comment = exports.comment = _angular2.default.module('comment', [_angularUiRouter2.default]).factory(_comment2.commentFactory, ['$http', _comment2.commentFactoryFunc]).component(_comment3.commentComponent, _comment3.commentComponentOptions).directive('showReply', _comment.showReply).directive('hideReply', _comment.hideReply).name;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _postsModule = __webpack_require__(126);

var _postSingle = __webpack_require__(122);

var _comment = __webpack_require__(117);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var post = exports.post = _angular2.default.module('post', [_postsModule.posts, _postSingle.post_single, _comment.comment]).name;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSingleComponentOptions = exports.postSingleComponent = undefined;

var _postSingle = __webpack_require__(120);

var postSingleComponent = exports.postSingleComponent = 'postSingleComponent';
var postSingleComponentOptions = exports.postSingleComponentOptions = {
  templateUrl: 'blog/src/app/components/post/post_single/post.single.html',
  controller: ['postSingleFactory', '$stateParams', '$rootScope', _postSingle.postSingleController],
  controllerAs: 'sm'
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function postSingleController(postSingleFactory, $stateParams, $rootScope) {
  var ctrl = this;
  ctrl.$onInit = function () {
    document.querySelector('.header').classList.add('zero_height');
    document.querySelector('.posts').classList.add('hide');
    setTimeout(function () {
      document.querySelector('.nav-wrapper').classList.add('fixed_nav');
    }, 500);
    postSingleFactory.getPost($stateParams.url).then(function (data) {
      console.log(data);
      ctrl.post = data.data.post;
      ctrl.post.comments.forEach(function (el) {
        return el.replyVisible = false;
      });
    });
  };

  $rootScope.$on('commented', function () {
    postSingleFactory.getPost($stateParams.url).then(function (data) {
      console.log(data);
      ctrl.post = data.data.post;
    });
  });
}

exports.postSingleController = postSingleController;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var postSingleFactory = exports.postSingleFactory = 'postSingleFactory';
var postSingleFactoryFunc = exports.postSingleFactoryFunc = function postSingleFactoryFunc($http) {
  return {
    getPost: function getPost(value) {
      return $http.get('/post/' + value);
    }
  };
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post_single = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(9);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _angularSanitize = __webpack_require__(24);

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

var _postSingle = __webpack_require__(121);

var _postSingle2 = __webpack_require__(119);

__webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var post_single = exports.post_single = _angular2.default.module('postSingle', [_angularUiRouter2.default, _angularSanitize2.default]).config(['$stateProvider', function ($stateProvider) {
  var singlePostState = {
    name: 'articles.single',
    url: '/:url',
    component: _postSingle2.postSingleComponent
  };

  $stateProvider.state(singlePostState);
}]).component(_postSingle2.postSingleComponent, _postSingle2.postSingleComponentOptions).factory(_postSingle.postSingleFactory, ['$http', _postSingle.postSingleFactoryFunc]).name;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postsComponentOptions = exports.postsComponent = undefined;

var _posts = __webpack_require__(124);

var postsComponent = exports.postsComponent = 'postsComponent';
var postsComponentOptions = exports.postsComponentOptions = {
  templateUrl: 'blog/src/app/components/post/posts/posts.html',
  controller: ['$localStorage', 'postsFactory', _posts.postsController],
  controllerAs: 'ctrl'
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function postsController($localStorage, postsFactory) {
  var ctrl = this;
  ctrl.$onInit = function () {

    postsFactory.getPosts().then(function (data) {
      ctrl.posts = data.data.posts;
      console.log(ctrl.posts);
    });
  };
}

exports.postsController = postsController;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var postsFactory = exports.postsFactory = 'postsFactory';

var postsFactoryFunction = exports.postsFactoryFunction = function postsFactoryFunction($http) {
	// body...
	return {
		getPosts: function getPosts() {
			return $http.get('/post');
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
exports.posts = undefined;

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(9);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _angularSanitize = __webpack_require__(24);

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

__webpack_require__(25);

var _posts = __webpack_require__(123);

var _posts2 = __webpack_require__(125);

__webpack_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var posts = exports.posts = _angular2.default.module('posts', [_angularUiRouter2.default, _angularSanitize2.default, 'ngStorage']).config(['$stateProvider', function ($stateProvider) {
  var postsState = {
    name: 'articles',
    url: '/articles',
    component: _posts.postsComponent
  };

  $stateProvider.state(postsState);
}]).factory(_posts2.postsFactory, ['$http', _posts2.postsFactoryFunction]).component(_posts.postsComponent, _posts.postsComponentOptions).name;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(9);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _header = __webpack_require__(62);

var _navbar = __webpack_require__(63);

var _optin = __webpack_require__(64);

var _components = __webpack_require__(65);

var _root = __webpack_require__(66);

__webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.module('blog', [_angularUiRouter2.default, _header.header, _navbar.navbar, _optin.optin, _components.components]).component(_root.rootComponentName, _root.rootComponent).config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
}]).name;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


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


/***/ })
]),[127]);