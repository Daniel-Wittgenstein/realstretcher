import { Scene } from 'phaser';


const jumpLevels = [

    200, 250, 300, 350, 400

]

export class Game extends Scene
{
  constructor ()
  {
    super('Game');
  }

  create ()
  {
    // Set background color
    this.cameras.main.setBackgroundColor(0x00ff00);

    // Create static walls around the screen
    this.walls = this.physics.add.staticGroup();
    this.walls.create(400, 590, 'ground').setScale(2).refreshBody(); // bottom wall
    this.walls.create(400, 10, 'ground').setScale(2).refreshBody();  // top wall
    this.walls.create(10, 300, 'ground').setScale(2, 0.5).refreshBody(); // left wall
    this.walls.create(790, 300, 'ground').setScale(2, 0.5).refreshBody(); // right wall

    // Create the player (a simple box)
    this.player = this.physics.add.sprite(400, 300, 'player').setCollideWorldBounds(true);
    this.player.setBounce(0.2);

    // Enable collision between the player and the walls
    this.physics.add.collider(this.player, this.walls);

    // Keyboard input (WASD)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    this.ONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.TWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

    this.fatLevel = 2

    this.jumpStrength = jumpLevels[2]

  }

  slimmer () {
    this.fatLevel++
    this.updatePlayerShape()
  }

  fatter () {
    this.fatLevel--
    this.updatePlayerShape()
  }

  updatePlayerShape() {
    if (this.fatLevel < 0) {
        this.fatLevel = 0
        return
    }
    if (this.fatLevel > 4) {
        this.fatLevel = 4
        return
    }
    this.player.setVelocityY(-200);

    if (this.fatLevel === 0) {
        this.player.setScale(3, 0.3)
        this.jumpStrength = jumpLevels[0]
    } else if (this.fatLevel === 1) {
        this.player.setScale(2, 0.666)
        this.jumpStrength = jumpLevels[1]
    } else if (this.fatLevel === 2) {
        this.player.setScale(1, 1)
        this.jumpStrength = jumpLevels[2]
    } else if (this.fatLevel === 3) {
        this.player.setScale(0.666, 2)
        this.jumpStrength = jumpLevels[3]
    }  else if (this.fatLevel === 4) {
        this.player.setScale(0.3, 3)
        this.jumpStrength = jumpLevels[4]
    }
  }
  

  update ()
  {
    if (this.A.isDown || this.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.D.isDown || this.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    // Player jump
    if ((this.W.isDown || this.up.isDown) && this.player.body.touching.down) {
      this.player.setVelocityY(-this.jumpStrength);
    }

    if (Phaser.Input.Keyboard.JustDown(this.ONE)) {
        this.fatter()
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.TWO)) {
        this.slimmer()
    }

  }


}
