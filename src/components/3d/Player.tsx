import { useAnimations } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useEntities } from 'miniplex-react'
import { useEffect } from 'react'
import { GLTFLoader } from 'three-stdlib'
import { ForkedECSComponent } from './ForkedComponent'
import { ECS } from './world'

export const Player = () => {
  const gltf = useLoader(GLTFLoader, '/models/rocketFlying.gltf')
  const entities = useEntities(ECS.world.with('player'))

  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene)
  useEffect(() => {
    actions?.Animation?.setEffectiveTimeScale(0.5).play()
    return () => {
      actions?.Animation?.stop()
    }
  }, [actions?.Animation, mixer])

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
                  <CapsuleCollider
                    args={[1.5, 1]}
                    position={[0, 1, 0]}
                    scale={2.5}
                    mass={5}
                  />
                  <group scale={10} rotation={[0, 0, Math.PI]}>
                    <primitive object={gltf.scene} />
                  </group>
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
