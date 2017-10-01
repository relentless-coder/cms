function appConfig($stateProvider, $locationProvider) {
  const homeState = {
    name: 'home',
    url: '/',
    component: 'homeComponent'
  }
  const contactState = {
    name: 'contact',
    url: '/contact',
    component: 'contactComponent'
  }
  const singlePostState = {
    name: 'articles.single',
    url: '/:url',
    component: 'postSingleComponent'
  }
  const postsState = {
    name: 'articles',
    url: '/articles',
    component: 'postsComponent'
  }

  $stateProvider.state(homeState).state(contactState).state(singlePostState).state(postsState);
  $locationProvider.html5Mode(true);
}

export {appConfig}