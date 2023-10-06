import { useLoader } from '@react-three/fiber'
import { ConvexHullCollider, RigidBody } from '@react-three/rapier'
import { Mesh } from 'three'
import { GLTFLoader } from 'three-stdlib'
import { ForkedECSComponent } from './ForkedComponent'
import { ECS } from './world'

export const Player = () => {
  const gltf = useLoader(GLTFLoader, '/models/spaceship25.gltf')

  return (
    <ECS.Entity>
      <ECS.Component name="player" data={true} />
      <ForkedECSComponent name="rigidBody">
        <RigidBody
          position={[0, 120, 0]}
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
                  (gltf.scene.children[0] as Mesh).geometry.attributes.position
                    .array as Float32Array,
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
    </ECS.Entity>
  )
}
