import { useGLTF } from '@react-three/drei'
import { ConvexHullCollider, RigidBody } from '@react-three/rapier'
import { useEntities } from 'miniplex-react'
import { Mesh, Quaternion } from 'three'
import { AsteroidModel } from './AsteroidModel'
import { ForkedECSComponent } from './ForkedComponent'
import { useAstroidPlayerCollision } from './useAstroidPlayerCollision'
import { ECS } from './world'

const tmpQuaterion = new Quaternion()

export const Asteroids = () => {
  const gltf = useGLTF('/models/asteroid03.gltf')
  const mesh = gltf.scene.children[0] as Mesh
  const entities = useEntities(ECS.world.with('asteroid'))
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
