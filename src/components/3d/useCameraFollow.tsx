import { useFrame } from '@react-three/fiber'
import { first } from 'lodash-es'
import { useEntities } from 'miniplex-react'
import { Vector3 } from 'three'
import { ECS } from './world'

const playerQuery = ECS.world.with('player', 'sceneObject')
const cameraQuery = ECS.world.with('cameraControls')
const tmpVec = new Vector3()

export const useCameraFollow = () => {
  const players = useEntities(playerQuery)
  const camera = useEntities(cameraQuery)
  useFrame(() => {
    const player = first(players.entities)
    if (!player) return
    const cameraControls = first(camera.entities)?.cameraControls
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
}
