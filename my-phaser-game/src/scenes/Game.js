import { Scene } from 'phaser';

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
    this.player = this.physics.add.sprite(400, 300, 'box').setCollideWorldBounds(true);
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
    
  }

  update ()
  {
    // Player movement
    if (this.A.isDown || this.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.D.isDown || this.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    // Player jump
    if ( (this.W.isDown || this.up.isDown) && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
