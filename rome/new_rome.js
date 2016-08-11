"use strict";
//var AttakTimer = 0;
var C = {
  background: {
    image: 'background_rome5.gif',
    scale: 1
  },
  roman: {
    image: 'roman.png',
    width: 36,
    height: 36,
    frames: 31,
    startx: 100,
    starty: 750,
    bounce: 0.3,
    drag: 3000,
    speed: 400
  },
  skeleton: {
    image: 'skeleton.png',
    width: 29,
    height: 29,
    frames: 16,
    startx: 700,
    starty: 730,
    bounce: 0.3,
    drag: 3000,
    speed: 200
    //gravity: 5000, // set to 0 to just use velocity
    //velocity: 1100 // ignored if gravity > 0
  }
};



class BootState {

  init() {
    console.log("%c~~~ Booting New_Rome ~~~\n Compliments of Smlucas13",
                "color:#fdf6e3; background:#073642");
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  create() {
    game.state.start('Preload')
  }

}

class PreloadState {

  create() {
    game.state.start('Start')
  }

}

class StartState {

  init() {
  }

  preload() {
    this.load.image('background',C.background.image);
    this.load.spritesheet('roman',
      C.roman.image,
      C.roman.width,
      C.roman.height,
      C.roman.frames
    );
    this.load.spritesheet('skeleton',
      C.skeleton.image,
      C.skeleton.width,
      C.skeleton.height,
      C.skeleton.frames
    );
  }

  create() {
    game.state.start('Play')
  }

}

class PlayState {

  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // background
    this.background = this.add.tileSprite(0,0,800,800,'background');
    //this.background.autoScroll(0,C.background.scroll);
    this.background.scale.set(C.background.scale);

    // roman
    this.roman = this.add.sprite(C.roman.startx,C.roman.starty,'roman');
    this.roman.smoothed = false; 
    this.roman.scale.set(3);
    this.roman.anchor.set(0.5,0.5);
    //roman animations
    this.roman.animations.add('left', [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 11, true);
    this.roman.animations.add('idle', [27], 1, true);
    this.roman.animations.add('right', [2, 3, 4, 5, 6, 7, 8,  9, 10], 11, true);
    this.roman.animations.add('atkr', [29], 1, true);
    this.roman.animations.add('atkl', [30], 1, true);
    //skeleton
    this.skeleton = this.add.sprite(C.skeleton.startx,C.skeleton.starty,'skeleton');
    this.skeleton.smoothed = false; 
    this.skeleton.scale.set(3);
    this.skeleton.anchor.set(0.5,0.5);
    //skeleton animations
    this.skeleton.animations.add('idle', [15], 15, true);
    this.skeleton.animations.add('left', [5, 6, 7], 6, true);
    this.skeleton.animations.add('right', [1, 2, 3], 6, true);
    this.skeleton.animations.add('atkr', [11], 1, true);
    this.skeleton.animations.add('atkl', [13], 1, true);
    this.skeleton.animations.play('idle',C.skeleton.frames,true);
    
    //roman physics
    game.physics.arcade.enable(this.roman);
    this.roman.body.collideWorldBounds = true;
    this.roman.body.bounce.setTo(C.roman.bounce);
    this.roman.body.drag.setTo(C.roman.drag);
    //skeleton physics
    game.physics.arcade.enable(this.skeleton);
    this.skeleton.body.collideWorldBounds = true;
    this.skeleton.body.bounce.setTo(C.skeleton.bounce);
    this.skeleton.body.drag.setTo(C.skeleton.drag);


    // skeleton
    //this.skeleton = this.add.sprite(160,-32,'skeleton');
    //this.skeleton.smoothed = false; 
    //this.skeleton.scale.set(1);
    //this.skeleton.anchor.set(0.5,0.5);
    //this.dodgeme.animations.play('blink',C.dodgeme.frames,true);
    //game.physics.arcade.enable(this.dodgeme);
    //if (C.dodgeme.gravity > 0) {
    //  this.dodgeme.body.gravity.y = C.dodgeme.gravity;
    //} else {
    //  this.dodgeme.body.velocity.y = C.dodgeme.velocity;
    //}
    //this.resetDodgeme();

    // movement keys
    //this.cursors = game.input.keyboard.createCursorKeys();
    this.atkkr = game.input.keyboard.addKey(Phaser.KeyCode.E);
    this.atkkl = game.input.keyboard.addKey(Phaser.KeyCode.Q);
    this.right = game.input.keyboard.addKey(Phaser.KeyCode.D);
    this.left = game.input.keyboard.addKey(Phaser.KeyCode.A);
  }

  update() {
    game.physics.arcade.collide(this.roman, this.skeleton);
    this.skeleton.body.velocity.x = -70;
    this.skeleton.animations.play('left')
    this.roman.body.velocity.x = 0;
    if (this.atkkl.isDown) {
        if (this.facing != 'left') {
            this.roman.animations.play('atkl');
            //this.AttackTimer = game.time.now + 750;
            this.facing = 'left';
        }
    }
    else if (this.atkkr.isDown) {
        if (this.facing != 'right'){
            this.roman.animations.play('atkr');
            //this.AttackTimer = game.time.now + 750;
            this.facing = 'right';
        }
    }
    
    else if (this.left.isDown) {
        this.roman.body.velocity.x = -300;
        if (this.facing != 'left') {
            this.roman.animations.play('left');
            this.facing = 'left';
        }
    }
    else if (this.right.isDown) {
        this.roman.body.velocity.x = 300;
        if (this.facing != 'right'){
            this.roman.animations.play('right');
            this.facing = 'right';
        }
    }
    else {
        if (this.facing != 'idle') {
            this.roman.animations.stop();
            if (this.facing == 'left') {
                this.roman.frame = 22;
            }
            else {
                this.roman.frame = 6;
            }

            this.facing = 'idle';
        }
    }
    //if (this.dodgeme.y >= 568) {
    //  this.resetDodgeme();
    //}
    //game.physics.arcade.collide(this.dodgeme,this.dodger,this.handleCollision);
  }

  //resetDodgeme() {
  //    this.dodgeme.y = -32;
  //    if (C.dodgeme.gravity > 0) {
  //      this.dodgeme.body.velocity.y = 0;
  //    }
  //    this.dodgeme.x = game.rnd.integerInRange(0,320);
  //}
  //--------------------
    //if (this.atkkl.isDown) {
    //  this.roman.animations.play('attackl');
    //}
    //else {
    //  this.roman.animations.play('idle')
    //}

  handleCollision() {
    game.state.start('End')
  }

}

class EndState {

  create() {
    game.state.start('Start')
  }

}

var game = new Phaser.Game(800,800);
game.state.add('Boot', BootState);
game.state.add('Preload', PreloadState);
game.state.add('Start', StartState);
game.state.add('Play', PlayState);
game.state.add('End', EndState);
game.state.start('Boot');
