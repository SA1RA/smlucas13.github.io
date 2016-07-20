// state: rome.play

'use strict'
var rome = {};
rome.Play = function () {};

rome.Play.prototype = {

  init: function () {
    //boot
    console.log("%c~~~ Booting the Roma_Invicta ~~~\n Compliments of smlucas13",
                "color:#fdf6e3; background:#07364");
  },

  preload: function () {
    //game_screen
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    //sprites
    this.load.image('background','background_rome5.gif');
    this.load.spritesheet('player','roman.gif',27,27,2);
  },

  create: function () {
    //background
    this.background = this.add.tileSprite(0,0,800,800,'background');
    this.background.autoScroll(0,0);
    this.background.scale.set(1);

    
  },

  update: function () {
  }
}
