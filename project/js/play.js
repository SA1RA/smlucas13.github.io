//game goes here VVV
'use strict'
var rome = {};
rome.play = function () {};

rome.prototype = {
  init: function () {
  //boot
  console.log("%c~~~ Booting the st ~~~\n Compliments of Alucard and others",
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


