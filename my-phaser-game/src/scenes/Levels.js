import tile from "./tile.js"

//do not spwan player directly on the ground. if they
//had gravity before they max spawn inside the floor otherwise

const _ = tile.empty
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

const f = tile.wallSmallFat1Pass
const F = tile.wallSmallFat2Pass

const Ü = tile.levelEnd

const ä = tile.fat
const Ä = tile.slim

const Z = tile.wallSmallLeft

const B = tile.breakBlock

const levels = [
  {
    name: "level 1",
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   S,   _,   _,   w,   _,   w,   w],  
      [w,   _,   Ä,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w,   Ü,   w,   w],  
    ],
    color: "yellow",
  },  

  {
    name: "level 2",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   ä,   _,   _,   w],  
      [w,   _,   S,   _,   _,   _,   _,   _,   _,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   ä,   _,   _,   _,   _,   _,   f,   _,   F,   _,   Ü,   w],  
    ],
    showWindow1: true,
  },  

  {
    name: "level 3",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   S,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   Ä,   w,   $,   $,   w,   _,   _,   _,   _,   _,   _,   w],  
      [w,   w,   w,   w,   _,   _,   w,   w,   w,   w,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   w,   w,   _,   _,   w,   _,   _,   _,   _,   $,   $,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   ä,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   Ü,   w],  
      [w,   _,   _,   _,   _,   w,   $,   $,   $,   w,   _,   w,   $,   $,   $,   w,   w],  
    ]
  },  

  {
    name: "level 4",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   b,   _,   w,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   w,   w,   w,   _,   w,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   w,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   S,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   Ü,   w],  
      [w,   w,   w,   w,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w],  
      [w,   _,   _,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w],  
      [w,   _,   _,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w,   w],  
      [w,   _,   _,   _,   w,   $,   $,   $,   $,   $,   $,   $,   $,   w,   w,   w,   w],  
    ],
    showWindow2: true,
  },  

  {
    name: "level 5",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   _,   Ä,   _,   w],  
      [w,   _,   _,   _,   b,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   w,   w,   w,   w,   _,   _,   _,   _,   _,   _,   _,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   y,   Ü,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   w,   w,   w,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   _,   w],  
      [w,   _,   S,   _,   ä,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   w,   _,   Y,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
    ]
  },  

  {
    name: "level 6",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   _,   _,   w],  
      [w,   _,   ä,   _,   _,   _,   _,   _,   _,   _,   _,   _,   Ä,   b,   _,   _,   w],  
      [w,   w,   w,   _,   _,   _,   _,   _,   _,   w,   w,   w,   w,   w,   _,   _,   w],  
      [w,   _,   _,   _,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   w,   w,   w,   w,   w,   w,   w,   _,   _,   _,   w],  
      [w,   _,   _,   b,   _,   _,   _,   _,   _,   b,   _,   _,   f,   _,   _,   _,   w],  
      [w,   _,   _,   w,   w,   _,   w,   w,   w,   w,   w,   w,   w,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   w,   w,   w,   w,   w,   _,   w,   _,   _,   _,   w],  
      [w,   w,   _,   _,   _,   _,   y,   x,   c,   F,   _,   Ü,   w,   _,   _,   _,   w],  
      [w,   w,   _,   S,   _,   _,   w,   w,   w,   _,   _,   w,   w,   _,   _,   _,   w],  
      [w,   w,   C,   _,   _,   ä,   ä,   f,   F,   _,   _,   w,   w,   Y,   _,   X,   w],  
    ]
  },  


  {
    name: "level 7",  
    tiles: [
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w,   w],  
      [w,   Ä,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   ä,   ä,   w],  
      [w,   Ä,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   b,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   w,   _,   w,   w,   w,   _,   w,   w,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   w,   _,   _,   _,   w,   Z,   b,   _,   _,   w,   _,   _,   w,   w,   w,   w],  
      [w,   w,   _,   _,   _,   _,   _,   w,   _,   _,   w,   _,   _,   w,   w,   _,   w],  
      [w,   w,   w,   _,   S,   _,   _,   _,   _,   _,   _,   _,   _,   y,   x,   Ü,   w],  
      [w,   w,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w,   w,   w],  
      [w,   w,   w,   _,   X,   _,   _,   _,   Y,   _,   _,   _,   _,   w,   w,   w,   w],  
    ],
    showWindow2: true,
    color: "yellow",
  },  

  {
    name: "level 8",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   S,   _,   _,   _,   _,   _,   B,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   Ü,   w],  
      [w,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w],  
      [w,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   $,   w,   $,   $,   $,   $,   $,   $,   $,   $,   $,   $,   $,   $,   _,   w],  
    ]
  },  

  {
    name: "level 9",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   _,   w,   w,   w,   w],  
      [w,   _,   ä,   _,   _,   _,   _,   _,   w,   _,   S,   _,   _,   w,   w,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   b,   _,   _,   _,   x,   y,   Ü,   w],  
      [w,   _,   _,   _,   w,   w,   _,   _,   w,   w,   w,   _,   _,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   w,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   Y,   _,   _,   _,   _,   w],  
      [w,   _,   w,   w,   w,   _,   _,   _,   _,   _,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   w,   _,   _,   _,   B,   _,   _,   _,   E,   _,   _,   w],  
      [w,   _,   _,   _,   _,   w,   _,   _,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   w,   Z,   X,   w,   _,   _,   _,   _,   _,   _,   _,   w],  
    ]
  },  

  {
    name: "level 10",  
    tiles: [
      [w,   ä,   _,   _,   _,   w,   w,   w,   _,   _,   _,   _,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   x,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   w],  
      [w,   _,   _,   B,   B,   w,   w,   w,   w,   _,   w,   _,   _,   w,   _,   _,   w],  
      [w,   _,   w,   _,   _,   w,   _,   Ä,   w,   B,   E,   B,   w,   w,   w,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   w,   _,   w,   _,   _,   w,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   X,   w,   w,   _,   _,   w],  
      [w,   w,   _,   S,   _,   _,   _,   B,   _,   _,   _,   w,   _,   _,   _,   w,   w],  
      [w,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   Ü,   w],  
      [w,   w,   w,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w],  
      [w,   w,   w,   w,   _,   _,   _,   B,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   w,   w,   w,   $,   $,   $,   $,   $,   $,   $,   $,   $,   $,   $,   $,   w],  
    ]
  },  
  {
    name: "level 11",  
    tiles: [
      [w,   w,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   x,   ä,   _,   _,   _,   _,   _,   w],  
      [w,   _,   b,   _,   _,   w,   w,   w,   w,   w,   w,   B,   B,   w,   B,   w,   w],  
      [w,   _,   w,   ä,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   w],  
      [w,   _,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   _,   _,   w],  
      [w,   B,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   y,   _,   Ä,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w,   w,   w,   _],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   ä,   _,   _,   b,   _,   w,   _],  
      [w,   _,   S,   _,   _,   w,   w,   w,   w,   w,   w,   _,   w,   w,   _,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   Ü,   _,   _,   _,   w,   w,   Y,   w,   w],  
      [w,   X,   _,   w,   $,   $,   $,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
    ],
    showWindow1: true
  },  
  {
    name: "level 6",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   b,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   w,   w,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   S,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   Ü,   _,   _,   _,   _,   _,   _,   w],  
    ]
  },  



]

export default levels


/* 

  {
    name: "test",  
    tiles: [
      [w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   w,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   _,   _,   _,   _,   S,   _,   _,   _,   _,   _,   _,   _,   _,   _,   _,   w],  
      [w,   y,   Y,   _,   _,   _,   _,   _,   _,   _,   c,   C,   v,   V,   x,   X,   w],  
    ]
  },  

*/