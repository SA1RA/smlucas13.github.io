"use strict";

var C = {
  background: {
    image: 'background_rome5.gif',
    scale: 1
  },
  roman: {
    image: 'roman.png',
    width: 29,
    height: 29,
    frames: 6,
    startx: 400,
    starty: 750,
    bounce: 0.3,
    drag: 3000,
    speed: 400
  },
  //dodgeme: {
  //  image: 'assets/dodgeme.png',
  //  width: 64,
  //  height: 64,
  //  frames: 1,
  //  gravity: 5000, // set to 0 to just use velocity
  //  velocity: 1100 // ignored if gravity > 0
  //}
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
    //this.load.spritesheet('dodgeme',
    //  C.dodgeme.image,
    //  C.dodgeme.width,
    //  C.dodgeme.height,
    //  C.dodgeme.frames
    //);
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
    player.animations.add('left', [0,], 10, true);
    player.animations.add('idle', [4], 20, true);
    player.animations.add('right', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    game.physics.arcade.enable(this.roman);
    this.roman.body.collideWorldBounds = true;
    this.roman.body.bounce.setTo(C.roman.bounce);
    this.roman.body.drag.setTo(C.roman.drag);

    // dodgeme
    //this.dodgeme = this.add.sprite(160,-32,'dodgeme');
    //this.dodgeme.smoothed = false; 
    //this.dodgeme.scale.set(1);
    //this.dodgeme.anchor.set(0.5,0.5);
    //this.dodgeme.animations.add('blink');
    //this.dodgeme.animations.play('blink',C.dodgeme.frames,true);
    //game.physics.arcade.enable(this.dodgeme);
    //if (C.dodgeme.gravity > 0) {
    //  this.dodgeme.body.gravity.y = C.dodgeme.gravity;
    //} else {
    //  this.dodgeme.body.velocity.y = C.dodgeme.velocity;
    //}
    //this.resetDodgeme();

    // movement keys
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update() {
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
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
