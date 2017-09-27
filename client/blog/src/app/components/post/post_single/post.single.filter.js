function highlight() {
  return function(value){
    if(value){
      value = value.replace(/const/g, '<span class="js-var">const</span>');
      value = value.replace(/=>/g, '<span class="js-func">=></span>');
      value = value.replace(/status/g, '<span class="js-method">status</span>')
      return value;
    }
  }
}

export {highlight}