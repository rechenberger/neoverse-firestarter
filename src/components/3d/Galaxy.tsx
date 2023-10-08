import { Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useSnapshot } from 'valtio'
import { Asteroids } from './Asteroids'
import { Camera } from './Camera'
import { DeviceOrientationDialog } from './DeviceOrientationDialog'
import { GalaxyEnvironment } from './GalaxyEnvironment'
import { HUD } from './HUD'
import { Player } from './Player'
import { Systems } from './Systems'
import { metaState } from './metastate'

const DEBUG = false

const useIsPaused = () => {
  const { mode } = useSnapshot(metaState)
  return mode !== 'gameplay'
}

export const Galaxy = () => {
  const isPaused = useIsPaused()
  return (
    <>
      <Canvas className="bg-gradient-to-tr from-black to-black bg-blend-darken flex-1">
        <Stats />
        <Physics
          gravity={[0, 0, 0]}
          colliders={false}
          timeStep="vary"
          debug={DEBUG}
          paused={isPaused}
        >
          {!isPaused && <Camera />}
          <GalaxyEnvironment />
          <Player />
          <Asteroids />
          <Systems />
        </Physics>
      </Canvas>
      <DeviceOrientationDialog />
      <HUD />
    </>
  )
}

export default Galaxy
