import { Stars } from '@react-three/drei'

export const GalaxyEnvironment = () => {
  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <directionalLight position={[30, 0, 30]} intensity={1} />
      <Stars />
      {/* <Grid
        args={[1000, 1000, 100, 100]}
        infiniteGrid
        cellColor={'#6f6f6f'}
        sectionColor={'#6f6f6f'}
        // sectionColor={'#9d4b4b'}
        // fadeDistance={25}
        // fadeStrength={1}
        cellSize={5}
        sectionSize={5}
        // sectionThickness={0}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      /> */}
    </>
  )
}
