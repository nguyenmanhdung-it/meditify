import React from 'react'

export default function reduceImgae() {
  return (
    <div>reduceImgae</div>
  )
}
var UTF = {};

const U16to8 = function(convertMe : string) {
var out = "";
  for(var i = 0; i < convertMe.length; i++) {
      var charCode = convertMe.charCodeAt(i);
      out += String.fromCharCode(~~(charCode/256));
      out += String.fromCharCode(charCode%256);
    }
  return out;
}

const U8to16 = function(convertMe : string) {
  var out = ""
  for(var i = 0; i < convertMe.length; i += 2) {
    var charCode = convertMe.charCodeAt(i)*256;
    charCode += convertMe.charCodeAt(i+1);
    out += String.fromCharCode(charCode)
  }
  return out;
}
