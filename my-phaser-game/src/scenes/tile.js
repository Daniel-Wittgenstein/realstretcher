
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
  "spikeDown", "spikeLeft", "startPlayer")

export default obj

