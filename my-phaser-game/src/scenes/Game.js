import { Scene } from 'phaser';
import tile from "./tile.js"
import Levels from './Levels.js'


//evtl. schiesser / gegner stacheln geben
//level end -> next level

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const developerMode = 0

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

  create()  {

    const camera = this.cameras.main
    this.camera = camera

    camera.setBackgroundColor(0x202020);

    this.bgTiles1 = this.add.tileSprite(0, 0, 1024, 768, 'bg').setOrigin(0, 0)
    this.bgTiles2 = this.add.tileSprite(0, 0, 1024, 768, 'bg-dark').setOrigin(0, 0)
    
    this.window1 = this.add.image(160, 160, 'window')
    this.window2 = this.add.image(800, 240, 'window')
    
    if (developerMode) this.drawGrid()

    this.walls = this.physics.add.staticGroup();


    this.player = this.physics.add.sprite(400, 300, "player-right")
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true)

    this.physics.add.collider(this.player, this.walls);


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
    this.THREE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

    this.devUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.devDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    this.fatLevel = 2

    this.jumpStrength = jumpLevels[2]

    this.spikeGroup = this.physics.add.staticGroup()
    this.enemyGroup = this.physics.add.group()
    this.boxGroup = this.physics.add.group()
    this.bulletGroup = this.physics.add.group()
    
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
        this.gotoNextLevel()
    })

    
    this.devSelection = 1

    this.dead = false

    this.level = 1 - 1 //start here xyzzy
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
    const img = (randomInteger(1, 100) <= 20) ? "ground2" : "ground"
    this.walls.create(x, y, img).setScale(scale).refreshBody()
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
    this.player.setTexture('dead' + this.colorScheme)
    this.player.setVelocityY(-200)
    this.deadCounter = 100
  }

  createEnemy(x, y) {
    this.createEntity("enemy", x, y, "enemy", (self) => {
        self.sprite.setBounce(0.2)
        this.physics.add.collider(self.sprite, this.walls)
        this.physics.add.collider(self.sprite, this.player)
        this.physics.add.collider(self.sprite, this.bulletGroup, () => {
            this.destroyEntity(self)
        })
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

  createSpike(x, y) {
    this.createEntity("spike", x, y, "spike", (self) => {
    }, (self) => {
    }, this.spikeGroup)
  }

  createSpikeDown(x, y) {
    this.createEntity("spike", x, y, "spike-down", (self) => {
    }, (self) => {
    }, this.spikeGroup)
  }

  createSpikeLeft(x, y) {
    this.createEntity("spikeLeft", x, y, "spike-left", (self) => {
    }, (self) => {
    }, this.spikeGroup)
  }

  createLaser(x, y, name) {
    this.createEntity("laser", x, y, "laser", (self) => {
        self.name = "laser-" + name
        self.counter = 0
        self.currentImgC = false
    }, (self) => {
        self.counter ++
        if (self.counter >= 10) {
            self.counter = 0
            self.currentImgC = !self.currentImgC
            self.sprite.setTexture(self.currentImgC ? "laser" : "laser2")
        }
    }, this.laserGroup)
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

  createGun(x, y) {
    this.createEntity("gun", x, y, "gun", (self) => {
        this.physics.add.collider(self.sprite, this.walls)
        this.physics.add.collider(self.sprite, this.player)
        self.sprite.body.drag.x = 1000
        self.counter = 0
    }, (self) => {
        self.counter++
        if (self.counter >= 100) {
            self.counter = 0
            this.createBullet(self.sprite.x + 20, self.sprite.y - 6)
        }
    })
  }

  
  createBullet(x, y) {
    this.createEntity("bullet", x, y, "bullet" + this.colorScheme, (self) => {
        this.physics.add.collider(self.sprite, this.player, () => {
            this.gameOver()
        })
        this.physics.add.collider(self.sprite, this.boxGroup, () => {
            this.destroyEntity(self)
        })
        this.physics.add.collider(self.sprite, this.walls, () => {
            this.destroyEntity(self)
        })
        self.sprite.body.setVelocityX(800)
        self.sprite.body.allowGravity = false
    }, () => {
    }, this.bulletGroup)
  }

  

  createLevelEnd(x, y) {
    this.createEntity("levelEnd", x, y, "flag" + this.colorScheme, () => {

    }, () => {}, this.levelEndGroup)
  }

  createSwitch(x, y, name) {
    this.createEntity("switch", x, y, "switch", (self) => {
        const func = () => {
            self.activateCounter = 24
            if (self.activated) return
            self.activated = true
            self.sprite.setTexture("switchOff" + this.colorScheme)
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

  gotoNextLevel() {
    this.level++
    this.gotoLevel(this.level)
  }

  gotoLevel(index) {
    this.currentLevelIndex = index
    this.restartLevel()
  }

  updatePlayerSprite() {
    if (this.playerDir === -1) {
        this.player.setTexture("player-left" + this.colorScheme)
    } else {
        this.player.setTexture("player-right" + this.colorScheme)
    }
  }

  restartLevel() {
    this.playerDir = 1
    this. updatePlayerSprite()
    this.fatLevel = 2
    this.player.body.setVelocity(0)
    this.player.body.setAcceleration(0)
    this.updatePlayerShape(false)
    this.destroyAllWalls()
    const img = "ground"
    //create floor: todo: should not be stretched image
    this.walls.create(0, 768, img).setScale(60, 1).refreshBody();
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

  updateColorScheme(color) {
    if (!color) {
        color = ""
        this.bgTiles1.setVisible(true)
        this.bgTiles2.setVisible(false)
    } else {
        color = "-" + color
        this.bgTiles1.setVisible(false)
        this.bgTiles2.setVisible(true)

    }
    this.colorScheme = color
  }

  setCameraNormal() {
    this.camera.stopFollow()
    this.camera.setPosition(0, 0)
    this.camera.setZoom(1)
  }

  loadLevel(levelIndex) {
    const level = Levels[levelIndex]

    this.window1.setVisible(!!level.showWindow1)
    this.window2.setVisible(!!level.showWindow2)

    this.updateColorScheme(level.color)
    this.player.setTexture("player-right" + this.colorScheme)

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

        case tile.specialOnlyForGunTrick:
            this.createWall(x, y+28, 0.15);
            break;
        
        case tile.gun:
            this.createGun(x, y)
            break;
        case tile.breakBlock:
            this.createBreakBlock(x, y)
            break

        case tile.levelEnd:
            this.createLevelEnd(x, y + 2)
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
        case tile.miniGunWall:
            this.createWall(x - 10, y + 16, 0.25);
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
            this.createBox(x, y); //todo: remove - 32 is for testing only
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
            this.createSpike(x, y + 24);
            break
        case tile.spikeDown:
            this.createSpikeDown(x, y - 24);
            break

        case tile.spikeLeft:
            this.createSpikeLeft(x + 24, y);
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
            this.player.setTexture('player' + this.colorScheme)
            this.restartLevel()
        }
    }

    if (!this.dead) {
        if (this.A.isDown || this.left.isDown) {
            this.player.setVelocityX(-160);
            this.playerDir = -1
            this.updatePlayerSprite()
        } else if (this.D.isDown || this.right.isDown) {
            this.player.setVelocityX(160);
            this.playerDir = 1
            this.updatePlayerSprite()
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

        if (Phaser.Input.Keyboard.JustDown(this.THREE)) this.gotoNextLevel()

        if (Phaser.Input.Keyboard.JustDown(this.devUP)) this.devSelDo(1)
        if (Phaser.Input.Keyboard.JustDown(this.devDOWN)) this.devSelDo(-1)
    }

    this.updateEntities()
  }


}
