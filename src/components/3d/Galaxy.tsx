import { Grid, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Camera } from './Camera'
import { Player } from './Player'

export const Galaxy = () => {
  return (
    <>
      <Canvas className="bg-gradient-to-tr from-purple-900/50 to-black bg-blend-darken flex-1">
        <Physics gravity={[0, 0, 0]} colliders={false} timeStep="vary">
          <ambientLight intensity={0.1} />
          <directionalLight position={[30, 0, 30]} intensity={1} />
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
          <Player />
        </Physics>
      </Canvas>
    </>
  )
}

export default Galaxy
