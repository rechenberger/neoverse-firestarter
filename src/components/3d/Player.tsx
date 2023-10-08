import { useLoader } from '@react-three/fiber'
import { ConvexHullCollider, RigidBody } from '@react-three/rapier'
import { useEntities } from 'miniplex-react'
import { Mesh } from 'three'
import { GLTFLoader } from 'three-stdlib'
import { ForkedECSComponent } from './ForkedComponent'
import { ECS } from './world'

export const Player = () => {
  const gltf = useLoader(GLTFLoader, '/models/spaceship25.gltf')
  const entities = useEntities(ECS.world.with('player'))

  return (
    <ECS.Entities in={entities}>
      {(entity) => (
        <>
          {/* <ECS.Component
            name="player"
            data={{ spawnPosition: new Vector3(0, 120, 0) }}
          /> */}
          <ForkedECSComponent name="rigidBody">
            <RigidBody
              position={entity.player?.spawnPosition || [0, 120, 0]}
              rotation={[0, 0, Math.PI]}
              angularDamping={3}
              linearDamping={1}
              enabledTranslations={[true, true, false]}
              enabledRotations={[false, false, true]}
              scale={0.5}
              // density={0.1}
            >
              <ForkedECSComponent name="sceneObject">
                <group>
                  <ConvexHullCollider
                    args={[
                      (gltf.scene.children[0] as Mesh).geometry.attributes
                        .position.array as Float32Array,
                    ]}
                    // density={0.1}
                  />
                  <primitive object={gltf.scene} />
                  <pointLight
                    intensity={200}
                    // distance={10 ** 10}
                    position={[0, 10, 8]}
                    color={'#fff'}
                    castShadow
                  />
                </group>
              </ForkedECSComponent>
            </RigidBody>
          </ForkedECSComponent>
        </>
      )}
    </ECS.Entities>
  )
}
