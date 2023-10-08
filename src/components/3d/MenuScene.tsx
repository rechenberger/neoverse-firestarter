import { CameraControls, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export const MenuScene = () => {
  return (
    <>
      <MenuPlayer />
      <CameraControls
        distance={12}
        // polarAngle={0}
        enabled
        makeDefault
      />
    </>
  )
}

const MenuPlayer = () => {
  const gltf = useGLTF('/models/spaceship25.gltf')
  const ref = useRef<THREE.Group | null>(null)

  useFrame((_, dt) => {
    ref.current?.rotateZ(dt * -0.2)
  })

  return (
    <group ref={ref} rotation={[Math.PI * -0.4, Math.PI * 0, Math.PI * -1.2]}>
      <primitive object={gltf.scene} />
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
