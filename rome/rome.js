// state: st.play

'use strict'
var st = {};
st.Play = function () {};

st.Play.prototype = {

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
    this.load.audio('ts', 'assets/audio/ts.mp3');
    this.load.audio('jn', 'assets/audio/jn.mp3');

    //sprites
    this.load.image('background','assets/sprites/os.png');
    this.load.spritesheet('obj','assets/sprites/bb.png',31,64,4);
    this.load.spritesheet('player','assets/sprites/ac.png',96,64,23);
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //audio start
    this.startSound = this.game.add.audio('jn');
    this.startSound.play();
    this.startSound = this.game.add.audio('ts');
    this.startSound.play();

    //background
    this.background = this.add.tileSprite(0,0,320,568,'background');
    this.background.autoScroll(50,0);
    this.background.scale.set(1);

    //obj
    this.obj = this.add.sprite(31,64,'obj');
    this.obj.anchor.setTo(0.5, 0.5);
    this.obj.animations.add('blink');
    this.obj.animations.play('blink',2,true);

    //player
    this.player = this.add.sprite(100,400,'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('blink');
    this.player.animations.play('blink',2,true);
    game.physics.arcade.enable(this.player);
    this.player.body.colliderWorldBounds = true;
    this.player.body.bounce.setTo(0.3);
    this.player.body.drag.setTo(3000);

    //movment keys
    this.cursors = game.input.keyboard.createCursorKeys();
  },

  update: function () {

    //collider
    game.physics.arcade.collide(this.player,this.obj,this.handleCollision);

    //boundaries
    //if (this.player.x < 1) {
    //  this.player.x = 2;
    //}
    //if (this.player.x > 300) {
    //  this.player.x = 299;
    //}

    //falling
    this.obj.y += 10;
    if (this.obj.y > 400) {
      //this.obj.y = 10;
      this.obj.x = game.rnd.integerInRange(31,289);
    }

    //tracking
    //if (this.obj.x < this.player.x) {
    //  this.obj.x += 5;
    //}
    //if (this.obj.x > this.player.x) {
    //  this.obj.x -= 5;
    }
   
    //controls
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -200;
    }
    if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 200;
    }
  }
}
