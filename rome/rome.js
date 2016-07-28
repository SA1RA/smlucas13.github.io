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
    //movment keys
    this.cursors = game.input.keyboard.createCursorKeys();
    
    //game_screen
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    //sprites
    this.load.image('playeridle'),'romanidle.png');
    this.load.image('background','background_rome5.gif');
    this.load.spritesheet('player','roman.png',29,29,6);
  },

  create: function () {
    //background
    this.background = this.add.tileSprite(0,0,800,800,'background');
    this.background.autoScroll(0,0);
    this.background.scale.set(1);
    
    //player
    this.player = this.add.sprite(400,750,'player');
    this.player.scale.set(3);
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('blink')
    //this.player.animations.add('blink');
    //this.player.animations.play('blink',11,true);
    game.physics.arcade.enable(this.player);
    this.player.body.drag.setTo(3000);
  
    //movment keys
    this.cursors = game.input.keyboard.createCursorKeys();
  },

  update: function () {
  
    //animation
    if (this.cursors.left.isDown) {
      this.player.animations.play('blink',6,true)
    }
    if (this.cursors.right.isDown) {
      this.player.animations.play('blink',6,true)
    }
    
    
    //boundaries
    if (this.player.x < 9) {
      this.player.x = 10;
    }
    if (this.player.x > 755) {
      this.player.x = 754;
    }
    
    
    //controls
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -400;
      //this.player.animations.add('blink');
      //this.player.animations.play('blink',6,true);
      //flip
      
    }
    if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 400;
      //this.player.animations.add('blink');
      //this.player.animations.play('blink',11,true);
    }
  }
}
