import { CameraControls, Grid, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export const Galaxy = () => {
  return (
    <>
      <Canvas className="bg-gradient-to-tr from-purple-900/50 to-black bg-blend-darken flex-1">
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        <Stars />
        {/* <PerspectiveCamera
          makeDefault
          // position={[-3, 0, -10]}
          // rotation={[-Math.PI / 2, 0, 0]}
        /> */}
        <CameraControls
          // ref={cameraControlsRef}
          // target={cameraTarget}
          minDistance={10}
          maxDistance={50}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 4}
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
