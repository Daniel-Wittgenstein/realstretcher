import { Scene } from 'phaser';
import tile from "./tile.js"
import Levels from './Levels.js'


//evtl. schiesser / gegner stacheln geben
//level end -> next level

const developerMode = 1

const jumpLevels = [

    300, 300, 370, 400, 400

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

    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

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
    this.laserGroup = this.physics.add.staticGroup()
    this.levelEndGroup = this.physics.add.staticGroup()

    this.physics.add.collider(this.enemyGroup, this.boxGroup)
    this.physics.add.collider(this.boxGroup, this.boxGroup)
    this.physics.add.collider(this.player, this.spikeGroup, () => {
        this.gameOver()
    })
    this.physics.add.collider(this.player, this.laserGroup, () => {
        this.gameOver()
    })
    this.physics.add.collider(this.player, this.levelEndGroup, () => {
        if (this.dead) return
        this.level++
        this.gotoLevel(this.level)
    })

    this.devSelection = 1

    this.dead = false

    this.level = 11 - 1 //start here xyzzy
    this.gotoLevel(this.level)

    if (developerMode) {
        this.input.on('pointerdown', (pointer) => {
            const gridX = 64
            const gridY = gridX
            let x = pointer.x
            let y = pointer.y
            x = Math.round(x / gridX) * gridX
            y = Math.round(y / gridY) * gridY
            let sel = this.devSelection            
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
    const texts = ["wall big", "wall std",
        "wall small left", "wall small right", "wall small mid",
        "wall need fat 1", "wall need fat 2", "wall std 2",
        "box", "enemy", "slim", "fat", "spike up", "spike to right", "spike down", "spike to left", ]
    this.devSelection += x
    const txt = texts[this.devSelection]
    const el = document.getElementById("dev-box")
    el.innerHTML = txt
  }

  gameOver() {
    if (this.dead) return
    this.dead = true
    this.player.setTexture('dead')
    this.player.setVelocityY(-200)
    this.deadCounter = 100
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
        self.sprite.body.mass = 0.8
    }, (self) => {

    }, this.boxGroup)
  }

  createSpike(x, y, angle = 0) {
    this.createEntity("spike", x, y, "spike", (self) => {
        self.sprite.setRotation(Phaser.Math.DegToRad(angle))
    }, (self) => {
    }, this.spikeGroup)
  }

  createLaser(x, y, name) {
    this.createEntity("laser", x, y, "laser", (self) => {
        self.name = "laser-" + name
    }, (self) => {}, this.laserGroup)
  }

  disactivateLaser(laserName) {
    for (const entity of state.entities) {
        if (entity.name === laserName) {
            entity.sprite.setVisible(false)
            entity.sprite.body.enable = false
            return
        }
    }
  }
  
  getEntityByName(name) {
    for (const entity of state.entities) {
        if (entity.name === name) {
            return entity
        }
    }
    return null
  }

  createBreakBlock(x, y) {
    this.createEntity("breakBlock", x, y, "breakBlock", (self) => {
        this.physics.add.collider(self.sprite, this.player, () => {
            this.destroyEntity(self)
        })
        this.physics.add.collider(self.sprite, this.boxGroup)
        this.physics.add.collider(self.sprite, this.enemyGroup)
        self.sprite.body.allowGravity = false
        self.sprite.body.immovable = true
    }, () => {})
  }

  createLevelEnd(x, y) {
    this.createEntity("levelEnd", x, y, "flag", () => {

    }, () => {}, this.levelEndGroup)
  }

  createSwitch(x, y, name) {
    this.createEntity("switch", x, y, "switch", (self) => {
        const func = () => {
            self.activateCounter = 24
            if (self.activated) return
            self.activated = true
            self.sprite.setTexture("switchOff")
            const laser = this.getEntityByName("laser-" + name)
            if (!laser) return
            self.laserPosX = laser.sprite.x
            self.laserPosY = laser.sprite.y
            this.destroyEntity(laser)
        }
        this.physics.add.collider(this.enemyGroup, self.sprite, func)
        this.physics.add.collider(this.player, self.sprite, func)
        this.physics.add.collider(this.boxGroup, self.sprite, func)
        self.sprite.body.allowGravity = false
        self.sprite.body.immovable = true
    }, (self) => {
        if (self.activateCounter > 0) {
            self.activateCounter--
            if (self.activateCounter <= 0) {
                self.activated = false
                self.sprite.setTexture("switch")
                this.createLaser(self.laserPosX, self.laserPosY, name)
            }
        }
    })
  }

  gotoLevel(index) {
    this.currentLevelIndex = index
    this.restartLevel()
  }

  restartLevel() {
    this.fatLevel = 2
    this.player.body.setVelocity(0)
    this.player.body.setAcceleration(0)
    this.updatePlayerShape(false)
    this.destroyAllWalls()
    this.walls.create(0, 768, 'ground').setScale(60, 1).refreshBody();
    this.destroyAllEntities()
    this.loadLevel(this.currentLevelIndex)
  }

  destroyAllWalls() {
    this.walls.clear(true, true)
  }

  destroyAllEntities() {
    for (const entity of state.entities) {
        this.destroyEntity(entity)
    }
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

  loadLevel(levelIndex) {
    const level = Levels[levelIndex]
    const tiles = level.tiles
    const abst = 64
    for (let row = 0; row < tiles.length; row++) {
        for (let col = 0; col < tiles[row].length; col++) {
            const x = col * abst
            const y = row * abst
            const val = tiles[row][col]
            this.doCreate(x, y, val)
        }
    }
  }

  doCreate(x, y, sel) {
    switch (sel) {
        case tile.empty:
            return
        
        case tile.breakBlock:
            this.createBreakBlock(x, y)
            break

        case tile.levelEnd:
            this.createLevelEnd(x, y + 12)
            break
        case tile.switch1:
            this.createSwitch(x, y + 22, "1")
            break
        case tile.laser1:
            this.createLaser(x, y, "1")
            break
        case tile.switch2:
            this.createSwitch(x, y + 22, "2")
            break
        case tile.laser2:
            this.createLaser(x, y, "2")
            break
        case tile.switch3:
            this.createSwitch(x, y + 22, "3")
            break
        case tile.laser3:
            this.createLaser(x, y, "3")
            break
        case tile.switch4:
            this.createSwitch(x, y + 22, "4")
            break
        case tile.laser4:
            this.createLaser(x, y, "4")
            break
        case tile.startPlayer:
            this.player.setPosition(x, y)
            break
        case tile.bigWall:
            this.createWall(x - 32, y - 32, 2);
            break
        case tile.wall:
            this.createWall(x, y, 1);
            break
        case tile.wallSmallLeft:
            this.createWall(x-16, y, 0.5);
            break
        case tile.wallSmallRight:
            this.createWall(x+16, y, 0.5);
            break
        case tile.wallSmallCenter:
            this.createWall(x, y, 0.5);
            break
        case tile.wallSmallFat1Pass:
            this.createWall(x, y-24, 0.2);
            break
        case tile.wallSmallFat2Pass:
            this.createWall(x, y-16, 0.5);
            break
        case tile.box:
            this.createBox(x, y);
            break
        case tile.enemy:
            this.createEnemy(x, y);
            break
        case tile.slim:
            this.createFood(x, y, "slim");
            break
        case tile.fat:
            this.createFood(x, y, "fat");
            break
        case tile.spikeUp:
            this.createSpike(x, y + 24, 0);
            break
        case tile.spikeRight:
            this.createSpike(x, y, 90);
            break
        case tile.spikeDown:
            this.createSpike(x, y, 180);
            break
        case tile.spikeLeft:
            this.createSpike(x, y, 270);
            break
    }
  }

  updatePlayerShape(bounce = true) {
    if (this.fatLevel < 0) {
        this.fatLevel = 0
        return
    }
    if (this.fatLevel > 4) {
        this.fatLevel = 4
        return
    }
    if (bounce) this.player.setVelocityY(-200)

    if (this.fatLevel === 0) {
        this.player.setScale(3.2, 0.3)
        this.jumpStrength = jumpLevels[0]
    } else if (this.fatLevel === 1) {
        this.player.setScale(1.75, 0.666)
        this.jumpStrength = jumpLevels[1]
    } else if (this.fatLevel === 2) {
        this.player.setScale(1.1, 0.95)
        this.jumpStrength = jumpLevels[2]
    } else if (this.fatLevel === 3) {
        this.player.setScale(0.666, 1.8)
        this.jumpStrength = jumpLevels[3]
    }  else if (this.fatLevel === 4) {
        this.player.setScale(0.3, 2.8)
        this.jumpStrength = jumpLevels[4]
    }
  }
  

  update () {

    if (this.dead) {
        this.deadCounter--
        if (this.deadCounter <= 0) {
            this.dead = false
            this.player.setTexture('player')
            this.restartLevel()
        }
    }

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

    if (Phaser.Input.Keyboard.JustDown(this.R)) {
        this.restartLevel()
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
