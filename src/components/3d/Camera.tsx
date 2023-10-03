import { CameraControls } from '@react-three/drei'

export const Camera = () => {
  return (
    <>
      {/* <PerspectiveCamera
          makeDefault
          // position={[-3, 0, -10]}
          // rotation={[-Math.PI / 2, 0, 0]}
        /> */}
      <CameraControls
        // ref={cameraControlsRef}
        // target={cameraTarget}
        distance={40}
        minDistance={30}
        maxDistance={50}
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
