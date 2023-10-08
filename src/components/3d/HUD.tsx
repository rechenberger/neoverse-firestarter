import { useEntities } from 'miniplex-react'
import { useSnapshot } from 'valtio'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Progress } from '../ui/progress'
import { metaState } from './metaState'
import { startGame } from './startGame'
import { Entity, world } from './world'

export const playerQuery = world.with('player', 'health')

export const HUD = () => {
  const players = useEntities(playerQuery)
  const player = players.entities?.[0]
  return (
    <>
      {!!player && <HudPlayer player={player} />}
      <StartButton />
      <EndOfGameDialog />
    </>
  )
}

const HudPlayer = ({ player }: { player: Entity }) => {
  const abc = useSnapshot(player.health!)
  return (
    <>
      <div className="absolute bottom-4 left-4 rounded-xl bg-card border p-2 flex flex-col w-72 gap-1">
        <div className="flex flex-row">
          <span className="font-bold flex-1">Health&nbsp;</span>
          <span>
            {abc?.current}/{abc?.max}
          </span>
        </div>
        <Progress value={(100 * abc?.current) / (abc?.max || 1)} />
      </div>
    </>
  )
}

const StartButton = () => {
  const { mode } = useSnapshot(metaState)
  if (mode !== 'menu') return null
  return (
    <>
      <div className="absolute inset-x-0 flex flex-col items-center bottom-1/4 ">
        <Button
          size="lg"
          onClick={() => {
            startGame()
            metaState.mode = 'gameplay'
          }}
          className="ring ring-white ring-offset-4 text-3xl italic font-extrabold py-8 px-16"
        >
          START
        </Button>
      </div>
    </>
  )
}

const EndOfGameDialog = () => {
  const { endOfGame } = useSnapshot(metaState)
  if (!endOfGame) return null
  const title = endOfGame.success ? 'You Win!' : 'Game over'
  return (
    <>
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open) metaState.endOfGame = null
        }}
      >
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <Button onClick={() => (metaState.endOfGame = null)}>OK</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
