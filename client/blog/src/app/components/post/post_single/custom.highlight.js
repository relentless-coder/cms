function customHighlight(str) {
  let keywords = `in of if for while finally var new function do return void else break catch
    instanceof with throw case default try this switch continue typeof delete
    let yield const export super debugger as async await static
    import from as`
  
  let literal = 'true false null undefined NaN Infinity'
  let builtIn = `eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent
    encodeURI encodeURIComponent escape unescape Object Function Boolean Error
    EvalError InternalError RangeError ReferenceError StopIteration SyntaxError
    TypeError URIError Number Math Date String RegExp Array Float32Array
    Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array
    Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require
    module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect
    Promise`

  keywords = keywords.split(' ');
  literal = literal.split(' ');
  builtIn = builtIn.split(' ');

  str = strReplace(str, keywords, 'keyword');
  str = strReplace(str, literal, 'literal');
  str = strReplace(str, builtIn, 'builtIn')
  
}

function strReplace(str, array, type) {
  array.forEach((el) => {
    let word = el;
    let regx = new RegExp(el, 'g');
    str = str.replace(regx, `<span class="js-${type}">${el}</span>`)
  })
  return str
}

export {customHighlight}