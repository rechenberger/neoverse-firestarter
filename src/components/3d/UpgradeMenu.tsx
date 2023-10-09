import { map } from 'lodash-es'
import { Heart, Shield } from 'lucide-react'
import { Fragment } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { ResourceType, resourceDefinitions } from '../statics/resources'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { metaState } from './metaState'

export const upgradeMenuState = proxy({
  open: false,
})

export const UpgradeMenu = () => {
  const state = useSnapshot(upgradeMenuState)
  const { resources } = useSnapshot(metaState)
  return (
    <>
      <Sheet
        open={state.open}
        onOpenChange={(open) => (upgradeMenuState.open = open)}
      >
        <SheetContent
          className="w-[400px] sm:w-[540px] mx-auto rounded-t-xl flex flex-col gap-2"
          side={'bottom'}
        >
          <SheetTitle>Resources</SheetTitle>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
            {map(resources, (amount: number, type: ResourceType) => {
              const resourceDefinition = resourceDefinitions[type]
              return (
                <Fragment key={type}>
                  <Card className="flex flex-row gap-2 px-2 py-1 items-center text-sm">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: resourceDefinition.color,
                      }}
                    />
                    <div>
                      <strong>{amount}</strong>
                      <span className="capitalize">&nbsp;{type}</span>
                    </div>
                  </Card>
                </Fragment>
              )
            })}
          </div>
          <div className="h-2" />
          <SheetTitle>Upgrades</SheetTitle>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
            <Card className="flex flex-col items-stretch gap-2 px-2 py-1">
              <div className="flex flex-row gap-2 items-center">
                <div className="flex-1">
                  <div className="font-bold">Health</div>
                  <div className="text-sm opacity-60">Level 4/10</div>
                </div>
                <Heart className="w-8 h-8 opacity-60" />
              </div>
              <Button
                variant={'secondary'}
                disabled
                className="px-1 py-1 flex flex-col gap-1 h-auto items-stretch"
              >
                <Card className="flex flex-row gap-2 px-2 py-1 items-center text-sm">
                  <div className="h-3 w-3 rounded-full bg-neutral-500" />
                  <div>
                    <strong>600</strong>
                    <span>&nbsp;Iron</span>
                  </div>
                </Card>
              </Button>
            </Card>
            <Card className="flex flex-col items-stretch gap-2 px-2 py-1">
              <div className="flex flex-row gap-2 items-center">
                <div className="flex-1">
                  <div className="font-bold">Shield</div>
                  <div className="text-sm opacity-60">Level 0/10</div>
                </div>
                <Shield className="w-8 h-8 opacity-60" />
              </div>
              <Button className="px-1 py-1 flex flex-col gap-1 h-auto items-stretch">
                <Card className="flex flex-row gap-2 px-2 py-1 items-center text-sm">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div>
                    <strong>20</strong>
                    <span>&nbsp;Silicone</span>
                  </div>
                </Card>
                <Card className="flex flex-row gap-2 px-2 py-1 items-center text-sm">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div>
                    <strong>10</strong>
                    <span>&nbsp;Aluminum</span>
                  </div>
                </Card>
              </Button>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
