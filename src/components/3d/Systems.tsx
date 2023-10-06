import { useCameraFollow } from './useCameraFollow'
import { usePlayerMovement } from './usePlayerMovements'

export const Systems = () => {
  usePlayerMovement()
  useCameraFollow()
  return <></>
}
