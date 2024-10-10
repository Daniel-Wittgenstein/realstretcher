import tile from "./tile.js"

//do not spwan player directly on the ground. if they
//had gravity before they max spawn inside the floor otherwise

const e = tile.empty
const w = tile.wall
const S = tile.startPlayer
const b = tile.box
const E = tile.enemy
const $ = tile.spikeUp

const y = tile.laser1
const Y = tile.switch1
const x = tile.laser2
const X = tile.switch2
const c = tile.laser3
const C = tile.switch3
const v = tile.laser4
const V = tile.switch4

const levels = [
  {
    name: "test",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   S,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   y,   Y,   e,   e,   e,   e,   e,   e,   e,   c,   C,   v,   V,   x,   X,   w],  
    ]
  },  


]

export default levels