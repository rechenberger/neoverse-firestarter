// import { RigidBody } from '@react-three/rapier'
import { CameraControls } from '@react-three/drei'
import { RapierRigidBody } from '@react-three/rapier'
import { World } from 'miniplex'
import { createReactAPI } from 'miniplex-react'
import { Object3D, Vector3 } from 'three'

export { queue } from 'miniplex'

export type Entity = {
  asteroid?: {
    spawnPosition: Vector3
    scale: number
    color: string
  }
  player?: {
    spawnPosition?: Vector3
  }

  sceneObject?: Object3D
  rigidBody?: RapierRigidBody
  cameraControls?: CameraControls

  health?: {
    current: number
    max?: number
  }
}

export const world = new World<Entity>()
export const ECS = createReactAPI(world)
