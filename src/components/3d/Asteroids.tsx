import { useGLTF } from '@react-three/drei'
import { ConvexHullCollider, RigidBody } from '@react-three/rapier'
import { useEntities } from 'miniplex-react'
import { startTransition, useLayoutEffect } from 'react'
import { Mesh, Quaternion, Vector3 } from 'three'
import { AsteroidModel } from './AsteroidModel'
import { ForkedECSComponent } from './ForkedComponent'
import { useAstroidPlayerCollision } from './useAstroidPlayerCollision'
import { ECS } from './world'

const tmpQuaterion = new Quaternion()

export const Asteroids = () => {
  const gltf = useGLTF('/models/asteroid03.gltf')
  const mesh = gltf.scene.children[0] as Mesh
  const entities = useLotsOfAsteroidsAndAlsoCleanThemUp()
  const { onCollision } = useAstroidPlayerCollision()

  return (
    <>
      <ECS.Entities in={entities}>
        {(eAstroid) => (
          <ForkedECSComponent name="rigidBody">
            <RigidBody
              position={eAstroid.asteroid.spawnPosition}
              scale={eAstroid.asteroid.scale}
              quaternion={tmpQuaterion.random()}
              angularDamping={2}
              linearDamping={0.5}
              enabledTranslations={[true, true, false]}
              enabledRotations={[true, true, true]}
              onCollisionEnter={(evt) => onCollision({ eAstroid, evt })}
            >
              <ConvexHullCollider
                density={3}
                // collisionGroups={interactionGroups(Layers.Asteroid, [
                //   Layers.Asteroid,
                //   Layers.Player,
                //   Layers.Bullet,
                // ])}
                args={[mesh.geometry.attributes.position.array as Float32Array]}
              />
              <AsteroidModel color={eAstroid.asteroid.color} />
            </RigidBody>
          </ForkedECSComponent>
        )}
      </ECS.Entities>
    </>
  )
}

const useLotsOfAsteroidsAndAlsoCleanThemUp = () => {
  const entities = useEntities(ECS.world.with('asteroid'))

  useLayoutEffect(() => {
    /* Spawn a bunch of asteroids */
    startTransition(() => {
      const layers = 12
      const size = 6
      const maxScale = size / 3
      const minScale = maxScale * 0.6
      const minRadius = 30

      for (let layer = 0; layer < layers; layer++) {
        let color = 'gray'
        if (layer <= 6) color = '#dc2626'
        if (layer <= 2) color = '#eab308'
        const radius = minRadius + layer * size
        const circumference = 2 * Math.PI * radius
        const fitInCircumference = Math.floor(circumference / size)
        for (let i = 0; i < fitInCircumference; i++) {
          const angle = (i / fitInCircumference) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          const position = new Vector3(x, y, 0)
          const scale = Math.random() * (maxScale - minScale) + minScale

          ECS.world.add({
            asteroid: {
              spawnPosition: position,
              scale,
              color,
            },
            health: 250 * scale,
          })
        }
      }

      ECS.world.add({
        asteroid: {
          spawnPosition: new Vector3(0, 0, 0),
          scale: 10,
          color: 'white',
        },
        health: 250 * 10,
      })
    })

    return () => {
      /* Destroy all asteroids */
      startTransition(() => {
        for (const entity of entities.entities) ECS.world.remove(entity)
      })
    }
  }, [])

  return entities
}
