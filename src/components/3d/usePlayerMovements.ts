import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useKeyboardMovementDirection } from './useKeyboardInput'
import { ECS } from './world'

const gravitationalForce = new Vector3(0, -0.5)

export const usePlayerMovement = () => {
  const players = ECS.world.with('player', 'rigidBody', 'sceneObject')
  const cameras = ECS.world.with('cameraControls')
  const movementDirection = useKeyboardMovementDirection()
  // console.log(movementDirection)
  useFrame(() => {
    for (const player of players.entities) {
      // console.log(player)
      const rb = player.rigidBody
      if (!rb) continue

      const camera = cameras.entities[0]
      if (!camera) continue

      const angle = camera.cameraControls.azimuthAngle
      const direction = movementDirection
        .clone()
        .add(gravitationalForce)
        .applyAxisAngle(new Vector3(0, 0, 1), angle)
        .multiplyScalar(1)

      rb.resetForces(true)
      rb.resetTorques(true)
      rb.applyImpulse(direction, true)
    }
  })
}
