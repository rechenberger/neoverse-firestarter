import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { ResourceList } from './ResourceList'
import { metaState } from './metaState'
import { useUpgrades } from './useUpgrades'

export const upgradeMenuState = proxy({
  open: false,
})

export const UpgradeMenu = () => {
  const state = useSnapshot(upgradeMenuState)
  const { resources } = useSnapshot(metaState)
  const upgrades = useUpgrades()
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
            <ResourceList resources={resources} />
          </div>
          <div className="h-2" />
          <SheetTitle>Upgrades</SheetTitle>
          <div className="grid gap-2 grid-cols-2">
            {upgrades.map((upgrade) => {
              if (!upgrade.show) return null
              return (
                <Fragment key={upgrade.type}>
                  <Card className="flex flex-col items-stretch gap-2 px-2 py-1">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="flex-1">
                        <div className="flex flex-row">
                          <div className="font-bold flex-1">
                            {upgrade.title}
                          </div>
                          <div className="text-sm opacity-60">
                            {upgrade.level}/{upgrade.maxLevel}
                          </div>
                        </div>
                        <div
                          className={cn(
                            'text-sm opacity-60',
                            !!upgrade.level && 'text-primary',
                          )}
                        >
                          {upgrade.getDescription(upgrade.level || 1)}
                        </div>
                      </div>
                      {/* <Shield className="w-8 h-8 opacity-60" /> */}
                    </div>
                    <Button
                      className="px-1 py-1 flex flex-col gap-1 h-auto items-stretch"
                      disabled={!upgrade.canUpgrade}
                      variant={upgrade.canUpgrade ? 'default' : 'secondary'}
                      onClick={() => upgrade.doUpgrade()}
                    >
                      <ResourceList resources={upgrade.costs} />
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
