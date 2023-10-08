import { useEntities } from 'miniplex-react'
import { world } from './world'

export const playerQuery = world.with('player')

export const HUD = () => {
  const players = useEntities(playerQuery)
  const player = players.entities?.[0]
  if (!player) return null
  return (
    <>
      <div className="absolute bottom-4 left-4 rounded bg-card border p-4">
        Health {player.health?.current}/{player.health?.max}
      </div>
    </>
  )
}
