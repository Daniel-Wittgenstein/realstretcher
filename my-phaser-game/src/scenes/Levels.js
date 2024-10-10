import tile from "./tile.js"

//do not spwan player directly on the ground. if they
//had gravity before they max spawn inside the floor otherwise

const e = tile.empty
const w = tile.wall
const ST = tile.startPlayer
const b = tile.box
const E = tile.enemy
const $ = tile.spikeUp

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
      [w,   e,   e,   e,   e,   e,   e,   E,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   ST,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   $,   e,   e,   e,   e,   b,   e,   b,   e,   e,   e,   e,   e,   w],  
    ]
  },  


]

export default levels