//game goes here VVV
'use strict'
var roma = {};
rome.play = function () {};

roma.prototype = {
  init: function () {
  //boot
  console.log("%c~~~ Booting Roma Invicta ~~~\n Compliments of saml",
  "color:#fdf6e3; background:#07364");
  },
  preload: function () {
  //game_screen
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  
  //audio load
  //sprites
  this.load.image('background','project/field.gif');
  this.load.image('legion','project/turtle1.gif');
  },
}

