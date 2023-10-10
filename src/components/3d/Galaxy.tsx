import { Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useSnapshot } from 'valtio'
import { Asteroids } from './Asteroids'
import { Camera } from './Camera'
import { DeviceOrientationDialog } from './DeviceOrientationDialog'
import { GalaxyEnvironment } from './GalaxyEnvironment'
import { HUD } from './HUD'
import { MenuScene } from './MenuScene'
import { Player } from './Player'
import { Systems } from './Systems'
import { metaState } from './metaState'

const DEBUG = false

export const Galaxy = () => {
  const { mode, paused } = useSnapshot(metaState)
  const isGameplay = mode === 'gameplay'
  return (
    <>
      <Canvas className="bg-gradient-to-tr from-black to-black bg-blend-darken flex-1">
        <Stats />
        <Physics
          gravity={[0, 0, 0]}
          colliders={false}
          // timeStep="vary"
          debug={DEBUG}
          paused={paused}
        >
          {isGameplay && <Camera />}
          {!isGameplay && <MenuScene />}
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
