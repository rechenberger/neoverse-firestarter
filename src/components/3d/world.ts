import { World } from 'miniplex'
import { createReactAPI } from 'miniplex-react'
import { Vector3 } from 'three'

export { queue } from 'miniplex'

export type Entity = {
  asteroid?: {
    spawnPosition: Vector3
    scale: number
  }
  player?: true
}

export const world = new World<Entity>()
export const ECS = createReactAPI(world)
