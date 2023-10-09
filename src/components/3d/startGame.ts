import { reverse, sumBy } from 'lodash-es'
import { Vector3 } from 'three'
import { proxy } from 'valtio'
import { PlanetType, planetDefinitions } from '../statics/planets'
import { resourceDefinitions } from '../statics/resources'
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
  spawnAsteroids({
    planetType: metaState.selectedPlanet,
  })
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

const spawnAsteroids = ({ planetType }: { planetType: PlanetType }) => {
  const planet = planetDefinitions[planetType]
  const noOfLayers = sumBy(planet.layers, (l) => l.size)
  const size = 6
  const maxScale = size / 3
  const minScale = maxScale * 0.6
  const minRadius = 30

  let absoluteLayerIdx = -1
  for (const layer of reverse(planet.layers)) {
    for (let subLayerIdx = 0; subLayerIdx < layer.size; subLayerIdx++) {
      absoluteLayerIdx++
      const resource = resourceDefinitions[layer.resourceType]

      const radius = minRadius + absoluteLayerIdx * size
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
            resourceType: layer.resourceType,
            resourceAmount: 1,
          },
          health: {
            current: layer.health,
          },
        })
      }
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
