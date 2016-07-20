// state: st.play

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
    this.load.image('background','background_rome1.gif');
    this.load.spritesheet('player','roman.gif',27,27,2);
  },

  create: function () {
    //background
    this.background = this.add.tileSprite(0,0,320,568,'background');
    this.background.autoScroll(50,0);
    this.background.scale.set(1);

    
  },

  update: function () {
  }
}
