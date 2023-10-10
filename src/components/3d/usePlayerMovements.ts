import { Vector3 } from 'three'
import { useDeviceOrientationInput } from './useDeviceOrientationInput'
import { useGameplayFrame } from './useGameplayFrame'
import { useKeyboardMovementDirection } from './useKeyboardInput'
import { ECS } from './world'

const gravitationalForce = new Vector3(0, -0.5)
const zUp = new Vector3(0, 0, 1)

export const usePlayerMovement = () => {
  const players = ECS.world.with('player', 'rigidBody', 'sceneObject')
  const cameras = ECS.world.with('cameraControls')
  const keyDirection = useKeyboardMovementDirection()
  const deviceOrientationDirection = useDeviceOrientationInput()
  const movementDirection = deviceOrientationDirection?.vector || keyDirection
  // console.log(movementDirection)
  useGameplayFrame(() => {
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
        .applyAxisAngle(zUp, angle)
        .multiplyScalar(5)

      // rb.resetForces(true)
      // rb.resetTorques(true)
      rb.applyImpulse(direction, true)
    }
  })
}
