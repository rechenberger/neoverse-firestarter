import { Grid, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Asteroids } from './Asteroids'
import { Camera } from './Camera'
import { Player } from './Player'
import { Systems } from './Systems'

const DEBUG = false

export const Galaxy = () => {
  return (
    <>
      <Canvas className="bg-gradient-to-tr from-purple-900/50 to-black bg-blend-darken flex-1">
        <Physics
          gravity={[0, 0, 0]}
          colliders={false}
          timeStep="vary"
          debug={DEBUG}
        >
          <ambientLight intensity={1} />
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
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Player />
          <Asteroids />
          <Systems />
        </Physics>
      </Canvas>
    </>
  )
}

export default Galaxy
