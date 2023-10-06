import { CameraControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { first } from 'lodash-es'
import { useEntities } from 'miniplex-react'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { ForkedECSComponent } from './ForkedComponent'
import { ECS } from './world'

const playerQuery = ECS.world.with('player', 'sceneObject')
const tmpVec = new Vector3()

export const Camera = () => {
  // TODO: refactor in ECS?
  const cameraControlsRef = useRef<CameraControls | null>(null)
  const players = useEntities(playerQuery)
  useFrame(() => {
    const player = first(players.entities)
    if (!player) return
    const cameraControls = cameraControlsRef.current
    if (!cameraControls) return
    player.sceneObject.getWorldPosition(tmpVec)
    const x = tmpVec.x
    const y = tmpVec.y
    const z = tmpVec.z
    cameraControls.getPosition(tmpVec)
    const cameraZ = tmpVec.z
    cameraControls.setLookAt(x, y, cameraZ, x, y, z, false)
    const angle = Math.atan2(y, x)
    cameraControls.rotateAzimuthTo(angle - Math.PI / 2, false)
  })
  useEffect(() => {
    cameraControlsRef.current?.camera.up.set(0, 0, 1)
    cameraControlsRef.current?.updateCameraUp()
  }, [])
  return (
    <>
      <ECS.Entity>
        <ForkedECSComponent name={'cameraControls'}>
          <CameraControls
            ref={cameraControlsRef}
            distance={80}
            minDistance={30}
            maxDistance={150}
            polarAngle={0}
            enabled
            makeDefault
          />
        </ForkedECSComponent>
      </ECS.Entity>
    </>
  )
}
