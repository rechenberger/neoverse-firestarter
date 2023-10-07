import { CollisionEnterPayload } from '@react-three/rapier'
import { useEntities } from 'miniplex-react'
import { useCallback } from 'react'
import { Vector3 } from 'three'
import { ECS } from './world'

const tmpVec3 = new Vector3()

export const useAstroidPlayerCollision = () => {
  const players = useEntities(ECS.world.with('player'))
  const onCollision = useCallback(
    (evt: CollisionEnterPayload) => {
      const player = players.entities.find(
        (e) => e.rigidBody === evt.other.rigidBody,
      )
      if (!player) return
      if (!player.sceneObject) return
      player.sceneObject.getWorldPosition(tmpVec3)
      let direction = tmpVec3.clone()
      evt.target.colliderObject?.getWorldPosition(tmpVec3)
      direction = direction.sub(tmpVec3).normalize()

      player.rigidBody?.applyImpulse(
        direction.clone().multiplyScalar(250),
        true,
      )
      evt.target.rigidBody?.applyImpulse(
        direction.clone().multiplyScalar(-100),
        true,
      )
    },
    [players.entities],
  )

  return {
    onCollision,
  }
}
