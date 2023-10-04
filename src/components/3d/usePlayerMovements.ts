import { useFrame } from '@react-three/fiber'
import { useKeyboardMovementDirection } from './useKeyboardInput'
import { ECS } from './world'

export const usePlayerMovement = () => {
  const players = ECS.world.with('player', 'rigidBody', 'sceneObject')
  const movementDirection = useKeyboardMovementDirection()
  console.log(movementDirection)
  useFrame(() => {
    for (const player of players.entities) {
      console.log(player)
      const rb = player.rigidBody
      if (!rb) continue
      console.log(rb)
      rb.resetForces(true)
      rb.resetTorques(true)
      rb.applyImpulse(movementDirection.multiplyScalar(0.1), true)
    }
  })
}
