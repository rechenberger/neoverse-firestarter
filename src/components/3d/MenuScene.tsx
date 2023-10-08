import {
  CameraControls,
  Float,
  useAnimations,
  useGLTF,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider } from '@react-three/rapier'
import { useEffect, useMemo, useRef } from 'react'
import { Color, Mesh, MeshStandardMaterial } from 'three'

export const MenuScene = () => {
  return (
    <>
      <MenuPlayer />
      <MenuAstroid color="#ef4444" position={[5, 5, -10]} />
      <MenuAstroid color="#10b981" position={[8, 4, -12]} />
      <MenuAstroid color="gray" position={[-6, 3, -4]} />
      <MenuAstroid color="orange" position={[-4, -2, 3]} />
      <MenuCamera />
    </>
  )
}

const MenuCamera = () => {
  const ref = useRef<CameraControls | null>(null)
  useEffect(() => {
    ref.current?.camera.up.set(0, 1, 0)
    ref.current?.updateCameraUp()
  }, [])
  return (
    <>
      <CameraControls
        distance={12}
        minDistance={12}
        maxDistance={12}
        ref={ref}
        polarAngle={Math.PI / 2}
        azimuthAngle={0}
        enabled
        makeDefault
      />
    </>
  )
}

const MenuPlayer = () => {
  const gltf = useGLTF('/models/rocketFlying.gltf')
  const ref = useRef<THREE.Group | null>(null)

  // useFrame((_, dt) => {
  //   ref.current?.rotateZ(dt * -0.2)
  // })

  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene)
  useEffect(() => {
    actions?.Animation?.setEffectiveTimeScale(0.5).play()
    return () => {
      actions?.Animation?.stop()
    }
  }, [actions?.Animation, mixer])

  return (
    <group ref={ref} rotation={[Math.PI * -0.4, Math.PI * 0, Math.PI * -1.2]}>
      <CapsuleCollider args={[1.5, 1]} position={[0, 1, 0]} />
      <group rotation={[0, 0, Math.PI]} scale={5}>
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
  )
}

const MenuAstroid = ({
  color = 'gray',
  position,
}: {
  color?: string
  position: [number, number, number]
}) => {
  const gltf = useGLTF('/models/asteroid03.gltf')
  const ref = useRef<Mesh>()
  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: new Color(color),
    })
  }, [color])
  useFrame(() => {
    if (!ref.current) return
    // ref.current.material = material
    ref.current?.traverse((node) => {
      if (node instanceof Mesh) {
        node.material = material
      }
    })
  })
  return (
    <>
      <group position={position}>
        <Float enabled speed={3} floatIntensity={3}>
          <primitive object={gltf.scene.clone()} ref={ref} />
        </Float>
      </group>
    </>
  )
}
