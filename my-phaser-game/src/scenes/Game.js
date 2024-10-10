import { Scene } from 'phaser';

//stacheln, schalter der von dir und von kiste und von gegner aktiviert wird und nur
//solange was drauf ist, schranke öffnet
//live level editing mit maus und saven

const jumpLevels = [

    200, 250, 300, 350, 400

]

let state = {
    entities: [],
}

export class Game extends Scene {

  constructor () {
    super('Game');
  }

  create ()  {
    // Set background color
    this.cameras.main.setBackgroundColor(0x00ff00);

    // Create static walls around the screen
    this.walls = this.physics.add.staticGroup();
    this.walls.create(400, 590, 'ground').setScale(2).refreshBody();
    this.walls.create(400, 10, 'ground').setScale(2).refreshBody();
    this.walls.create(10, 300, 'ground').setScale(2, 0.5).refreshBody();
    this.walls.create(790, 300, 'ground').setScale(2, 0.5).refreshBody();

    this.walls.create(0, 790, 'ground').setScale(60, 1).refreshBody();


    // Create the player (a simple box)
    this.player = this.physics.add.sprite(400, 300, 'player').setCollideWorldBounds(true);
    this.player.setBounce(0.2);

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

    this.spikeGroup = this.physics.add.staticGroup()
    this.enemyGroup = this.physics.add.group()
    this.boxGroup = this.physics.add.group()
    this.physics.add.collider(this.enemyGroup, this.boxGroup)
    this.physics.add.collider(this.player, this.spikeGroup, () => {
        this.gameOver()
    })

    /*
    this.enemy = this.physics.add.sprite(400, 300, 'enemy').setCollideWorldBounds(true);
    this.enemy.setBounce(0.2);
    this.physics.add.collider(this.enemy, this.walls);
*/
    this.createEnemy(100, 100)
    this.createFood(100, 400, "slim")
    this.createFood(300, 400, "fat")
    this.createBox(300, 400)
    this.createSpike(500, 400, 90)
    this.createSpike(200, 400, 180)

    this.dead = false

  }

  gameOver() {
    this.dead = true
    this.player.setTexture('dead')
  }

  createEnemy(x, y) {
    this.createEntity("enemy", x, y, "enemy", (self) => {
        self.sprite.setCollideWorldBounds(true)
        self.sprite.setBounce(0.2)
        this.physics.add.collider(self.sprite, this.walls)
        this.physics.add.collider(self.sprite, this.player)
        self.dir = -1
    }, (self) => {
        if (self.dir === -1) {
            self.sprite.setVelocityX(-100)
        } else {
            self.sprite.setVelocityX(100)
        }
        if (self.sprite.body.blocked.left) {
            self.dir = 1
        }
        if (self.sprite.body.blocked.right) {
            self.dir = -1
        }
    }, this.enemyGroup)
  }

  createFood(x, y, type) {
    const img = type === "slim" ? "slim" : "fat"
    this.createEntity("food", x, y, img, (self) => {
        this.physics.add.collider(self.sprite, this.player, () => {
            if (type === "slim") {
                this.slimmer()
            } else {
                this.fatter()
            }
            this.destroyEntity(self)
        })
        self.sprite.body.allowGravity = false
    }, (self) => {

    })
  }

  createBox(x, y) {
    this.createEntity("box", x, y, "box", (self) => {
        this.physics.add.collider(self.sprite, this.player)
        this.physics.add.collider(self.sprite, this.walls)

        self.sprite.body.drag.x = 500
    }, (self) => {

    }, this.boxGroup)
  }

  createSpike(x, y, angle = 0) {
    this.createEntity("spike", x, y, "spike", (self) => {
        self.sprite.setRotation(Phaser.Math.DegToRad(angle))
    }, (self) => {
    }, this.spikeGroup)
  }

  destroyEntity(entity) {
    if (entity.sprite) {
        entity.sprite.destroy()
    }
    state.entities = state.entities.filter(en => en !== entity)
  }

  createEntity(type = "", x = 0, y = 0, img = "enemy", createFunc = () => {},
        updateFunc = () => {}, group = null) {
    const entity = {type, updateFunc}
    if (group) {
        entity.sprite = group.create(x, y, img)
    } else {
        entity.sprite = this.physics.add.sprite(x, y, img)
    }
    createFunc(entity)
    state.entities.push(entity)
  }

  updateEntities() {
    for (const entity of state.entities) {
        entity.updateFunc(entity)
    }
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
  

  update () {

    if (!this.dead) {
        if (this.A.isDown || this.left.isDown) {
        this.player.setVelocityX(-160);
        } else if (this.D.isDown || this.right.isDown) {
        this.player.setVelocityX(160);
        } else {
        this.player.setVelocityX(0);
        }

        if ((this.W.isDown || this.up.isDown) && this.player.body.touching.down) {
        this.player.setVelocityY(-this.jumpStrength);
        }
    }

    if (Phaser.Input.Keyboard.JustDown(this.ONE)) {
        this.fatter()
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.TWO)) {
        this.slimmer()
    }

    this.updateEntities()
  }


}
