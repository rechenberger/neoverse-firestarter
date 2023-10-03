import { Grid, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Camera } from 'lucide-react'

export const Galaxy = () => {
  return (
    <>
      <Canvas className="bg-gradient-to-tr from-purple-900/50 to-black bg-blend-darken flex-1">
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        <Stars />
        <Camera />
        <Grid
          args={[5, 5]}
          infiniteGrid
          cellColor={'#6f6f6f'}
          sectionColor={'#6f6f6f'}
          // sectionColor={'#9d4b4b'}
          fadeDistance={25}
          fadeStrength={1}
          cellSize={5}
          sectionSize={5}
          // sectionThickness={0}
          position={[3.2, 0, 3.5]}
        />
      </Canvas>
    </>
  )
}

export default Galaxy
