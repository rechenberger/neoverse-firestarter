import { CollisionEnterPayload } from '@react-three/rapier'
import { useEntities } from 'miniplex-react'
import { useCallback } from 'react'
import { Vector3 } from 'three'
import { ECS, Entity } from './world'

const tmpVec3 = new Vector3()

export const useAstroidPlayerCollision = () => {
  const players = useEntities(ECS.world.with('player'))
  const onCollision = useCallback(
    ({ eAstroid, evt }: { eAstroid: Entity; evt: CollisionEnterPayload }) => {
      const player = players.entities.find(
        (e) => e.rigidBody === evt.other.rigidBody,
      )
      if (!player) return
      console.log('ASTROID COLLISION', eAstroid)
      if (!player.sceneObject) return
      player.sceneObject.getWorldPosition(tmpVec3)
      let direction = tmpVec3.clone()
      eAstroid?.sceneObject?.getWorldPosition(tmpVec3)
      direction = direction.sub(tmpVec3).normalize()

      player.rigidBody?.applyImpulse(
        direction.clone().multiplyScalar(250),
        true,
      )
      eAstroid.rigidBody?.applyImpulse(
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
