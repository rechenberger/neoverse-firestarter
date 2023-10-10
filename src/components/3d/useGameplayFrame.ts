import { RenderCallback, useFrame } from '@react-three/fiber'
import { metaState } from './metaState'

export const useGameplayFrame = (
  callback: RenderCallback,
  renderPriority?: number,
) => {
  useFrame((...args) => {
    if (metaState.paused) return
    callback(...args)
  }, renderPriority)
}
