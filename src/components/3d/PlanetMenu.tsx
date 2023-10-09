import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { metaState } from './metaState'
import { usePlanets } from './usePlanets'

export const planetMenuState = proxy({
  open: false,
})

export const PlanetMenu = () => {
  const state = useSnapshot(planetMenuState)
  const { resources } = useSnapshot(metaState)
  const planets = usePlanets()
  return (
    <>
      <Sheet
        open={state.open}
        onOpenChange={(open) => (planetMenuState.open = open)}
      >
        <SheetContent
          className="w-[400px] sm:w-[540px] mx-auto rounded-t-xl flex flex-col gap-2"
          side={'bottom'}
        >
          <SheetTitle>Planets</SheetTitle>
          <div className="grid gap-2 grid-cols-2">
            {planets?.map((planet) => {
              return (
                <Fragment key={planet.type}>
                  <Card
                    className={cn(
                      'flex flex-col items-center gap-4 p-4 cursor-pointer',
                      planet.isSelected && 'border-primary',
                    )}
                    onClick={() => planet.select()}
                  >
                    <div className="font-bold flex-1 capitalize">
                      {planet.type}
                    </div>
                    <div
                      className="h-12 w-12 rounded-full"
                      style={{ backgroundColor: planet.color }}
                    />
                    <Button
                      className="px-1 py-1 flex flex-col gap-1 h-auto items-stretch w-24"
                      disabled={!planet.canSelect}
                      variant={planet.canSelect ? 'default' : 'secondary'}
                    >
                      {planet.isSelected ? 'Visiting' : 'Visit'}
                    </Button>
                  </Card>
                </Fragment>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
