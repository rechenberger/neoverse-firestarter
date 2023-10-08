import { useEntities } from 'miniplex-react'
import { useSnapshot } from 'valtio'
import { Entity, world } from './world'

export const playerQuery = world.with('player', 'health')

export const HUD = () => {
  const players = useEntities(playerQuery)
  const player = players.entities?.[0]
  if (!player) return null
  return <HudPlayer player={player} />
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
