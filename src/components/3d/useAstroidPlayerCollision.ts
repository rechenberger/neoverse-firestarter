import { CollisionEnterPayload } from '@react-three/rapier'
import { useEntities } from 'miniplex-react'
import { useCallback } from 'react'
import { Vector3 } from 'three'
import { changeHealth } from './changeHealth'
import { metaState } from './metaState'
import { endGame } from './startGame'
import { ECS, Entity, world } from './world'

const tmpVec3 = new Vector3()

export const useAstroidPlayerCollision = () => {
  const players = useEntities(ECS.world.with('player'))
  const onCollision = useCallback(
    ({ eAstroid, evt }: { eAstroid: Entity; evt: CollisionEnterPayload }) => {
      const player = players.entities.find(
        (e) => e.rigidBody === evt.other.rigidBody,
      )
      if (!player) return
      if (!player.sceneObject) return

      if (eAstroid.health) {
        changeHealth(eAstroid, -1 * metaState.stats.drillDamage)
        const damageToPlayer = Math.max(10 - metaState.stats.armor, 0)
        changeHealth(player, -1 * damageToPlayer)
        if (player.health && player.health.current <= 0) {
          endGame({ success: false })
        }
        if (eAstroid.health.current <= 0) {
          if (eAstroid.asteroid?.isCore) {
            endGame({ success: true })
          }
          world.remove(eAstroid)
          changeHealth(player, metaState.stats.regain)

          // Gain Resource:
          const resourceType = eAstroid.asteroid?.resourceType
          if (resourceType) {
            if (eAstroid.asteroid?.resourceAmount) {
              metaState.resources[resourceType] =
                (metaState.resources[resourceType] || 0) +
                eAstroid.asteroid.resourceAmount

              metaState.resourcesGathered[resourceType] =
                (metaState.resourcesGathered[resourceType] || 0) +
                eAstroid.asteroid.resourceAmount
            }
          }
        } else {
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
        }
      }
    },
    [players.entities],
  )

  return {
    onCollision,
  }
}
