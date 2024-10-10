
let c = -1
let obj = {}

function add(key) {
  if(!key) return
  c++
  obj[key] = c
}

function adds(...args) {
  args.forEach(a => add(a))
}

adds("empty", "bigWall", "wall", "wallSmallLeft", "wallSmallRight",
  "wallSmallCenter", "wallSmallFat1Pass", "wallSmallFat2Pass",
  "box", "enemy", "slim", "fat", "spikeUp", "spikeRight",
  "spikeDown", "spikeLeft", "startPlayer", "switch", "switchOff",
  "switch1", "laser1",
  "switch2", "laser2",
  "switch3", "laser3",
  "switch4", "laser4", "levelEnd", "breakBlock"
)

export default obj

