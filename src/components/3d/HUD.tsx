import { useEntities } from 'miniplex-react'
import { useSnapshot } from 'valtio'
import { Button } from '../ui/button'
import { metaState } from './metastate'
import { Entity, world } from './world'

export const playerQuery = world.with('player', 'health')

export const HUD = () => {
  const players = useEntities(playerQuery)
  const player = players.entities?.[0]
  return (
    <>
      {!!player && <HudPlayer player={player} />}
      <StartButton />
    </>
  )
}

const HudPlayer = ({ player }: { player: Entity }) => {
  const abc = useSnapshot(player.health!)
  return (
    <>
      <div className="absolute bottom-4 left-4 rounded bg-card border p-4">
        Health {abc?.current}/{abc?.max}
      </div>
    </>
  )
}

const StartButton = () => {
  return (
    <>
      <div className="absolute bottom-4 right-4">
        <Button onClick={() => (metaState.mode = 'gameplay')}>Start</Button>
      </div>
    </>
  )
}
