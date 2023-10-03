// import { RigidBody } from '@react-three/rapier'
import { World } from 'miniplex'
import { createReactAPI } from 'miniplex-react'
import { Object3D, Vector3 } from 'three'

export { queue } from 'miniplex'

export type Entity = {
  asteroid?: {
    spawnPosition: Vector3
    scale: number
  }
  player?: true

  sceneObject?: Object3D
  rigidBody?: any
}

export const world = new World<Entity>()
export const ECS = createReactAPI(world)
