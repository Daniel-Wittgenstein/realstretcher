import tile from "./tile.js"

const e = tile.empty
const w = tile.wall
const ST = tile.startPlayer

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
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
      [w,   e,   e,   e,   e,   ST,   e,   e,   e,   e,   e,   e,   e,   e,   e,   e,   w],  
    ]
  },  


]

export default levels