function appConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  const profileState = {
    name: 'profile',
    url: '/admin/profile',
    component: 'userComponent'
  }
  const signupState = {
    name: 'signup',
    url: '/admin/signup',
    component: 'signupComponent'
  }
  const homeState = {
    name: 'home',
    url: '/admin/home',
    component: 'allPostsComponent'
  }
  const editState = {
    url: '/admin/edit/:url',
    name: 'edit',
    component: 'postSingleComponent'
  }
  const newState = {
    name: 'new',
    url: '/admin/new',
    component: 'postNewComponent'
  }
  const newsState = {
    name: 'newsletter',
    url: '/admin/newsletter',
    component: 'newsletterComponent'
  }
  const loginState = {
    name: 'login',
    url: '/admin/login',
    component: 'loginComponent'
  }
  const commentsState = {
    name: 'comments',
    url: '/admin/comments',
    component: 'commentComponent'
  }
  const singleState = {
    name: 'comments.comment',
    url: '/:id',
    component: 'singleCommentComponent'
  }

  $stateProvider.state(singleState).state(commentsState).state(newsState).state(newState).state(editState).state(homeState).state(signupState).state(loginState).state(profileState)
  $locationProvider.html5Mode(true);
  $urlRouterProvider.when('/admin/', '/admin/home')
}

export {appConfig}