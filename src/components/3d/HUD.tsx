import { cn } from '@/lib/utils'
import { useEntities } from 'miniplex-react'
import { useEffect, useState } from 'react'
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
  const { mode } = useSnapshot(metaState)
  return (
    <>
      {!!player && <HudPlayer player={player} />}
      <EndOfGameDialog />
      {mode === 'menu' && (
        <>
          <StartButton />
          <HudTitle />
        </>
      )}
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
  const [init, setInit] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setInit(true)
    }, 2000)
  })
  return (
    <>
      <div
        className={cn(
          'absolute inset-x-0 flex flex-col items-center bottom-24',
          'transition-all duration-1000 opacity-0',
          init && 'opacity-100',
        )}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            startGame()
            metaState.mode = 'gameplay'
          }}
          className="text-3xl italic font-extrabold py-8 px-16"
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

const HudTitle = () => {
  const [init, setInit] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setInit(true)
    }, 500)
  })
  return (
    <>
      <div className="absolute top-24 inset-x-0 flex flex-col items-center">
        <div>
          <div
            className={cn(
              'text-6xl tracking-tighter font-extralight transition-all duration-1000 opacity-0',
              init && 'opacity-100',
            )}
          >
            neoverse
          </div>
          <div
            className={cn(
              'text-3xl uppercase font-extrabold italic text-primary transition-all duration-500 opacity-0 delay-500',
              init && 'translate-x-12 opacity-100',
            )}
          >
            Firestarter
          </div>
        </div>
      </div>
    </>
  )
}
