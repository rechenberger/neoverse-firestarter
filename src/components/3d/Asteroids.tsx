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
      {/* <Instances
        limit={1000} // Optional: max amount of items (for calculating buffer size)
        range={1000} // Optional: draw-range
        {...gltf.scene}
      > */}
      <ECS.Entities in={entities}>
        {({ asteroid }) => (
          <ECS.Component name="rigidBody">
            <RigidBody
              position={asteroid.spawnPosition}
              scale={asteroid.scale}
              // quaternion={tmpQuaterion.random()}
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
                // onCollisionEnter={(e) => {
                //   const position = tmpVec3
                //     .copy(e.manifold.localContactPoint1(0) as Vector3)
                //     .applyQuaternion(e.collider.rotation() as Quaternion)
                //     .add(e.collider.translation() as Vector3)

                //   // spawnSmokeVFX({ position })
                // }}
              />
              {/* <Astroid /> */}
              {/* <Instance />
  
{/* <Instance
                // color="red"
                // scale={2}
                // position={[1, 2, 3]}
                // rotation={[Math.PI / 3, 0, 0]}
                /> */}
              <primitive object={gltf.scene.clone()} />
              {/* <Instance>
                  <primitive object={gltf.scene} />
                </Instance> */}
              {/* <ECS.Component name="sceneObject">
                <Particle matrixAutoUpdate={false} />
              </ECS.Component> */}
            </RigidBody>
          </ECS.Component>
        )}
      </ECS.Entities>
      {/* </Instances> */}
    </>
  )
}
export const spawnAsteroid = (position: Vector3, scale: number = 1) => {
  ECS.world.add({
    asteroid: {
      spawnPosition: position,
      scale,
    },
    health: 250 * scale,
  })
}

const useLotsOfAsteroidsAndAlsoCleanThemUp = (count: number) => {
  const entities = useEntities(ECS.world.with('asteroid'))

  useLayoutEffect(() => {
    /* Spawn a bunch of asteroids */
    startTransition(() => {
      for (let i = 0; i < count; i++) {
        spawnAsteroid(
          new Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, 0),
          // new Vector3(10, -20 + i, 0),
          Math.random() * 1.2 + 0.8,
          // 0.2,
        )
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
