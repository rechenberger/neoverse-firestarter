import { Vector3 } from 'three'
import { ECS, world } from './world'

export const startGame = () => {
  world.clear()
  spawnAsteroids()
  world.add({
    player: {
      spawnPosition: new Vector3(0, 120, 0),
    },
  })
}

const spawnAsteroids = () => {
  const layers = 12
  const size = 6
  const maxScale = size / 3
  const minScale = maxScale * 0.6
  const minRadius = 30

  for (let layer = 0; layer < layers; layer++) {
    let color = 'gray'
    let health = 10
    if (layer <= 2) {
      color = '#eab308'
      health *= 4
    } else if (layer <= 6) {
      color = '#dc2626'
      health *= 2
    }
    const radius = minRadius + layer * size
    const circumference = 2 * Math.PI * radius
    const fitInCircumference = Math.floor(circumference / size)
    for (let i = 0; i < fitInCircumference; i++) {
      const angle = (i / fitInCircumference) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      const position = new Vector3(x, y, 0)
      const scale = Math.random() * (maxScale - minScale) + minScale

      ECS.world.add({
        asteroid: {
          spawnPosition: position,
          scale,
          color,
        },
        health: {
          current: health,
        },
      })
    }
  }

  ECS.world.add({
    asteroid: {
      spawnPosition: new Vector3(0, 0, 0),
      scale: 10,
      color: 'white',
    },
    health: {
      current: 80,
    },
  })
}
