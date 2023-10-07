import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color, Mesh, MeshStandardMaterial } from 'three'
import { ForkedECSComponent } from './ForkedComponent'

export const AsteroidModel = ({ color = 'gray' }: { color?: string }) => {
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
      <ForkedECSComponent name="sceneObject">
        <primitive object={gltf.scene.clone()} ref={ref} />
      </ForkedECSComponent>
    </>
  )
}
