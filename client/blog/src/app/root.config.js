function appConfig($stateProvider, $locationProvider) {


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
    component: 'postSingleComponent',
    onExit: ()=>{
      $('.posts').removeClass('hide')
    }
  }
  const postsState = {
    name: 'articles',
    url: '/articles',
    component: 'postsComponent'
  }

  $stateProvider.state(aboutState).state(contactState).state(singlePostState).state(postsState);
  $locationProvider.html5Mode(true);
}

export { appConfig }
