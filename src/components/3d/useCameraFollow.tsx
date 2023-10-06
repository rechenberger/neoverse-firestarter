import { useFrame } from '@react-three/fiber'
import { first } from 'lodash-es'
import { useEntities } from 'miniplex-react'
import { Quaternion, Vector3 } from 'three'
import { ECS } from './world'

const playerQuery = ECS.world.with('player', 'sceneObject')
const cameraQuery = ECS.world.with('cameraControls')

const tmpVec = new Vector3()
const tmpQ = new Quaternion()
const zUp = new Vector3(0, 0, 1)

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

    // Set camera position + look at player
    const cameraZ = tmpVec.z
    cameraControls.setLookAt(x, y, cameraZ, x, y, z, false)

    // Rotate camera so that 0,0,0 is at bottom of screen
    const angle = Math.atan2(y, x)
    cameraControls.rotateAzimuthTo(angle - Math.PI / 2, false)

    // Rotate player to face 0,0,0
    tmpQ.setFromAxisAngle(zUp, angle + Math.PI / 2)
    player.rigidBody?.setRotation(tmpQ, false)
  })
}
