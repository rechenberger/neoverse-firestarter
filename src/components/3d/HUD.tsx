import { cn } from '@/lib/utils'
import { Globe, Wrench } from 'lucide-react'
import { useEntities } from 'miniplex-react'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Progress } from '../ui/progress'
import { HudTopRight } from './HudTopRight'
import { PlanetMenu, planetMenuState } from './PlanetMenu'
import { ResourceList } from './ResourceList'
import { UpgradeMenu, upgradeMenuState } from './UpgradeMenu'
import { metaState } from './metaState'
import { startGame } from './startGame'
import { useKeyboardShortcut } from './useKeyboardShortcut'
import { useShowPlanetSelection } from './usePlanets'
import { useCanUpgradeAny, useHasUpgradeAny } from './useUpgrades'
import { Entity, world } from './world'

export const playerQuery = world.with('player', 'health')

export const HUD = () => {
  const players = useEntities(playerQuery)
  const player = players.entities?.[0]
  const { mode } = useSnapshot(metaState)
  useKeyboardShortcut(
    {
      code: 'KeyP',
    },
    () => {
      metaState.paused = !metaState.paused
    },
  )
  return (
    <>
      {!!player && <HudPlayer player={player} />}
      <EndOfGameDialog />
      {mode === 'menu' && (
        <>
          <StartButton />
          <HudTitle />
          <UpgradeMenu />
          <PlanetMenu />
        </>
      )}
      <HudTopRight />
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
  const hasUpgrade = useHasUpgradeAny()
  const canUpgrade = useCanUpgradeAny()
  const showUpgrade = hasUpgrade || canUpgrade
  const showPlanets = useShowPlanetSelection()
  return (
    <>
      <div
        className={cn(
          'absolute inset-x-0 flex flex-col items-center bottom-16',
        )}
      >
        <div className="flex flex-col gap-2">
          {showPlanets && (
            <div
              className={cn(
                'transition-all duration-1000 opacity-0 delay-1000',
                init && 'opacity-100',
              )}
            >
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  'text-lg font-bold py-2 px-4 uppercase flex flex-row gap-2 relative w-full',
                )}
                onClick={() => {
                  planetMenuState.open = true
                }}
              >
                <Globe className="w-4 h-4" />
                <span>planets</span>
              </Button>
            </div>
          )}
          {showUpgrade && (
            <div
              className={cn(
                'transition-all duration-1000 opacity-0 delay-500',
                init && 'opacity-100',
              )}
            >
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  'text-lg font-bold py-2 px-4 uppercase flex flex-row gap-2 relative w-full',
                )}
                onClick={() => {
                  upgradeMenuState.open = true
                }}
              >
                {canUpgrade && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                )}
                <Wrench className="w-4 h-4" />
                <span>upgrade</span>
              </Button>
            </div>
          )}
          <div
            className={cn(
              'transition-all duration-1000 opacity-0',
              init && 'opacity-100',
            )}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                startGame()
              }}
              className={cn(
                'text-3xl italic font-extrabold py-8 px-16 uppercase w-full',
              )}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const EndOfGameDialog = () => {
  const { endOfGame } = useSnapshot(metaState)
  if (!endOfGame) return null
  const title = endOfGame.success ? 'Planet destroyed' : 'Ship destroyed'
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

          <hr className="-mx-6" />

          <DialogTitle>Resources gathered:</DialogTitle>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
            <ResourceList resources={metaState.resourcesGathered} />
          </div>
          <Button onClick={() => (metaState.endOfGame = null)}>Collect</Button>
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
      <div className="absolute top-16 inset-x-0 flex flex-col items-center">
        <div>
          <div
            className={cn(
              'text-6xl tracking-tighter font-extralight transition-all duration-1000 opacity-0 text-white',
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
