import { Vector3 } from 'three'
import { proxy } from 'valtio'
import { ResourceType, resourceDefinitions } from '../statics/resources'
import { baseStats } from '../statics/stats'
import { allUpgradeDefinitions } from '../statics/upgrades'
import { metaState } from './metaState'
import { ECS, world } from './world'

export const endGame = (endOfGame: { success: boolean }) => {
  world.clear()
  metaState.endOfGame = endOfGame
  metaState.mode = 'menu'
}

export const startGame = () => {
  world.clear()
  spawnAsteroids()
  updateStats()
  metaState.resourcesGathered = {}
  world.add({
    player: {
      spawnPosition: new Vector3(0, 120, 0),
    },
    health: proxy({
      current: metaState.stats.health,
      max: metaState.stats.health,
    }),
  })
}

export const updateStats = () => {
  let stats = { ...baseStats }
  for (const upgrade of allUpgradeDefinitions) {
    const level = metaState.upgrades[upgrade.type] || 0
    if (level > 0) {
      stats = upgrade.modifyStats({ level, statsBefore: stats })
    }
  }
  metaState.stats = stats
}

const spawnAsteroids = () => {
  const layers = 12
  const size = 6
  const maxScale = size / 3
  const minScale = maxScale * 0.6
  const minRadius = 30

  for (let layer = 0; layer < layers; layer++) {
    let health = 10
    let resourceType: ResourceType = 'iron'
    if (layer <= 2) {
      health *= 4
      resourceType = 'aluminum'
    } else if (layer <= 6) {
      health *= 2
      resourceType = 'silicone'
    }
    const resource = resourceDefinitions[resourceType]

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
          color: resource.color,
          resourceType,
          resourceAmount: 1,
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
