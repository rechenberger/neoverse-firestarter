import { CameraControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { ForkedECSComponent } from './ForkedComponent'
import { ECS } from './world'

export const Camera = () => {
  // TODO: refactor in ECS?
  const cameraControlsRef = useRef<CameraControls | null>(null)
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
