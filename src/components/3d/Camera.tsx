import { CameraControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { first } from 'lodash-es'
import { useEntities } from 'miniplex-react'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { ECS } from './world'

const playerQuery = ECS.world.with('player', 'sceneObject')
const offset = 40
const tmpVec3 = new Vector3()

export const Camera = () => {
  // TODO: refactor in ECS?
  const cameraControlsRef = useRef<CameraControls | null>(null)
  const players = useEntities(playerQuery)
  useFrame(() => {
    const player = first(players.entities)
    if (!player) return
    const cameraControls = cameraControlsRef.current
    if (!cameraControls) return
    const pos = tmpVec3
    player.sceneObject.getWorldPosition(pos)
    cameraControls.setPosition(pos.x, pos.y, offset)
    cameraControls.setTarget(...pos.toArray())
  })
  return (
    <>
      {/* <PerspectiveCamera
          makeDefault
          // position={[-3, 0, -10]}
          // rotation={[-Math.PI / 2, 0, 0]}
        /> */}
      <CameraControls
        ref={cameraControlsRef}
        // target={cameraTarget}
        distance={80}
        minDistance={30}
        maxDistance={150}
        // minPolarAngle={Math.PI / 8}
        // maxPolarAngle={Math.PI / 4}
        // polarAngle={Math.PI / 8}
        // minPolarAngle={selectedPlanetId ? Math.PI / 4 : Math.PI / 8}
        // maxPolarAngle={selectedPlanetId ? Math.PI / 4 : Math.PI / 8}
        enabled
        makeDefault
        // dollyToCursor={true}
        // enablePan={false}
        // azimuthalAngle
        // :
        // 0.9103473397698809
        // distance
        // :
        // 8.790434579553098
        // polarAngle
        // :
        // 0.25
        // minAzimuthAngle={0}
        // maxAzimuthAngle={0}
        // onEnd={(evt) => {
        //   const orbit = evt?.target
        //   if (!orbit) return
        //   console.log({
        //     polarAngle: orbit.getPolarAngle() / Math.PI,
        //     azimuthalAngle: orbit.getAzimuthalAngle(),
        //     distance: orbit.getDistance(),
        //   })
        // }}
      />
    </>
  )
}
