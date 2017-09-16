export function allPostsController(getPosts, $state, tokenFactory){
  const ctrl = this;
  const limitParagraphs = (data)=>{
    let localData = data.forEach((el)=>{
      el.content = el.content.substr(0, 300);
    })

    return localData
  }
  ctrl.$onInit = function(){
   if(tokenFactory.findToken()){
     ctrl.isLoggedIn = true;
   }
   if(!tokenFactory.findToken()){
      $state.go('login');
    };
    getPosts.allPosts().then((data)=>{
      ctrl.posts = data.data;
    }, (err)=>{
      console.log(err.status, err.error.message);
    })
  }
}
