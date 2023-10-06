import { Grid, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Asteroids } from './Asteroids'
import { Camera } from './Camera'
import { Player } from './Player'
import { Systems } from './Systems'
import { GalaxyEnvironment } from './GalaxyEnvironment'

const DEBUG = false

export const Galaxy = () => {
  return (
    <>
      <Canvas className="bg-gradient-to-tr from-black to-black bg-blend-darken flex-1">
        <Physics
          gravity={[0, 0, 0]}
          colliders={false}
          timeStep="vary"
          debug={DEBUG}
        >
          <Camera />
          <GalaxyEnvironment />
          <Player />
          <Asteroids />
          <Systems />
        </Physics>
      </Canvas>
    </>
  )
}

export default Galaxy
