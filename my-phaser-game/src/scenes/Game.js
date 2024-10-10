import { Scene } from 'phaser';

//schalter der von dir und von kiste und von gegner aktiviert wird und nur
//solange was drauf ist, schranke öffnet, restart, respawn
//level saven und reloaden

const developerMode = 1

const jumpLevels = [

    200, 250, 340, 370, 400

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
    this.add.image(512, 384, 'background');

    if (developerMode) this.drawGrid()

    // Create static walls around the screen
    this.walls = this.physics.add.staticGroup();

    this.walls.create(0, 768, 'ground').setScale(60, 1).refreshBody();


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

    this.devUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.devDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    this.fatLevel = 2

    this.jumpStrength = jumpLevels[2]

    this.spikeGroup = this.physics.add.staticGroup()
    this.enemyGroup = this.physics.add.group()
    this.boxGroup = this.physics.add.group()
    this.physics.add.collider(this.enemyGroup, this.boxGroup)
    this.physics.add.collider(this.player, this.spikeGroup, () => {
        this.gameOver()
    })

    this.devSelection = 1

    this.dead = false

    if (developerMode) {
        this.input.on('pointerdown', (pointer) => {
            const gridX = 64
            const gridY = gridX
            let x = pointer.x
            let y = pointer.y
            x = Math.round(x / gridX) * gridX
            y = Math.round(y / gridY) * gridY
            let sel = this.devSelection
            switch (sel) {
                case 0:
                    this.createWall(x - 32, y - 32, 2);
                    break
                case 1:
                    this.createWall(x, y, 1);
                    break
                case 2:
                    this.createWall(x-16, y, 0.5);
                    break
                case 3:
                    this.createWall(x+16, y, 0.5);
                    break
                case 4:
                    this.createWall(x, y, 0.5);
                    break

                
                case 5:
                    this.createBox(x, y);
                    break
                case 6:
                    this.createEnemy(x, y);
                    break
                case 7:
                    this.createFood(x, y, "slim");
                    break
                case 8:
                    this.createFood(x, y, "fat");
                    break
                case 9:
                    this.createSpike(x, y, 0);
                    break
                case 10:
                    this.createSpike(x, y, 90);
                    break
                case 11:
                    this.createSpike(x, y, 180);
                    break
                case 12:
                    this.createSpike(x, y, 270);
                    break
            }
            
        })
    }

  }


  drawGrid() {
    const gridSize = 64; // Set your grid size
    const gridColor = 0x000000; // Grid line color
    const offset = 32
    
    const graphics = this.add.graphics();
    graphics.lineStyle(1, gridColor, 1); // Set line style (width, color, alpha)
  
    // Draw the grid
    for (let x = 0; x < this.cameras.main.width; x += gridSize) {
      graphics.moveTo(x + offset, 0 + offset);
      graphics.lineTo(x + offset, this.cameras.main.height + offset);
    }
  
    for (let y = 0; y < this.cameras.main.height; y += gridSize) {
      graphics.moveTo(0 + offset, y + offset);
      graphics.lineTo(this.cameras.main.width + offset, y + offset);
    }
  
    graphics.strokePath(); // Draw the lines
  }

  createWall(x, y, scale) {
    this.walls.create(x, y, 'ground').setScale(scale).refreshBody()
  }

  devSelDo(x) {
    const texts = ["wall big", "wall std", "wall small left", "wall small right", "wall small mid", "box", "enemy", "slim", "fat", "spike up", "spike to right", "spike down", "spike to left", ]
    this.devSelection += x
    const txt = texts[this.devSelection]
    const el = document.getElementById("dev-box")
    el.innerHTML = txt
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

    if (developerMode) {
        if (Phaser.Input.Keyboard.JustDown(this.ONE)) this.fatter()
        if (Phaser.Input.Keyboard.JustDown(this.TWO)) this.slimmer()

        if (Phaser.Input.Keyboard.JustDown(this.devUP)) this.devSelDo(1)
        if (Phaser.Input.Keyboard.JustDown(this.devDOWN)) this.devSelDo(-1)
    }

    this.updateEntities()
  }


}
