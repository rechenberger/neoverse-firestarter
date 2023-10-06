import { useLoader } from '@react-three/fiber'
import { ConvexHullCollider, RigidBody } from '@react-three/rapier'
import { useEntities } from 'miniplex-react'
import { startTransition, useLayoutEffect } from 'react'
import { Mesh, Quaternion, Vector3 } from 'three'
import { GLTFLoader } from 'three-stdlib'
import { ECS } from './world'

const tmpQuaterion = new Quaternion()
const tmpVec3 = new Vector3()

export const Asteroids = () => {
  const gltf = useLoader(GLTFLoader, '/models/asteroid03.gltf')
  const mesh = gltf.scene.children[0] as Mesh
  const entities = useLotsOfAsteroidsAndAlsoCleanThemUp(100)

  return (
    <>
      <ECS.Entities in={entities}>
        {({ asteroid }) => (
          <ECS.Component name="rigidBody">
            <RigidBody
              position={asteroid.spawnPosition}
              scale={asteroid.scale}
              quaternion={tmpQuaterion.random()}
              angularDamping={2}
              linearDamping={0.5}
              enabledTranslations={[true, true, false]}
              enabledRotations={[true, true, true]}
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
              <primitive object={gltf.scene.clone()} />
            </RigidBody>
          </ECS.Component>
        )}
      </ECS.Entities>
    </>
  )
}

const useLotsOfAsteroidsAndAlsoCleanThemUp = (count: number) => {
  const entities = useEntities(ECS.world.with('asteroid'))

  useLayoutEffect(() => {
    /* Spawn a bunch of asteroids */
    startTransition(() => {
      const layers = 10
      const size = 6
      const minRadius = 30

      for (let layer = 0; layer < layers; layer++) {
        const radius = minRadius + layer * size
        const circumference = 2 * Math.PI * radius
        const fitInCircumference = Math.floor(circumference / size)
        for (let i = 0; i < fitInCircumference; i++) {
          const angle = (i / fitInCircumference) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          const position = new Vector3(x, y, 0)
          const scale = Math.random() * 1.2 + 0.8

          ECS.world.add({
            asteroid: {
              spawnPosition: position,
              scale,
            },
            health: 250 * scale,
          })
        }
      }
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
