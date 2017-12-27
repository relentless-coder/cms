function appConfig($stateProvider, $locationProvider) {
  
  const homeState = {
    name: 'home',
    url: '/',
    component: 'root'
  }

  const aboutState = {
    name: 'about',
    url: '/about',
    component: 'aboutComponent'
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

  $stateProvider.state(homeState).state(aboutState).state(contactState).state(singlePostState).state(postsState);
  $locationProvider.html5Mode(true);
}

export { appConfig }