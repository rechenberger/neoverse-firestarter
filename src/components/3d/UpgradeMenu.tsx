import { Fragment } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { displayResourceMap } from '../statics/resources'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
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
            {displayResourceMap(resources).map((resource) => {
              return (
                <Fragment key={resource.type}>
                  <Card className="flex flex-row gap-2 px-2 py-1 items-center text-sm">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: resource.definition.color,
                      }}
                    />
                    <div>
                      <strong>{resource.amount}</strong>
                      <span className="capitalize">&nbsp;{resource.type}</span>
                    </div>
                  </Card>
                </Fragment>
              )
            })}
          </div>
          <div className="h-2" />
          <SheetTitle>Upgrades</SheetTitle>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
            {upgrades.map((upgrade) => {
              return (
                <Fragment key={upgrade.type}>
                  <Card className="flex flex-col items-stretch gap-2 px-2 py-1">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="flex-1">
                        <div className="flex flex-row">
                          <div className="font-bold capitalize flex-1">
                            {upgrade.type}
                          </div>
                          <div className="text-sm opacity-60">
                            {upgrade.level}/{upgrade.maxLevel}
                          </div>
                        </div>
                        <div className="text-sm opacity-60">
                          {upgrade.description}
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
                      {displayResourceMap(upgrade.costs).map((resource) => {
                        return (
                          <Fragment key={resource.type}>
                            <Card className="flex flex-row gap-2 px-2 py-1 items-center text-sm">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{
                                  backgroundColor: resource.definition.color,
                                }}
                              />
                              <div>
                                <strong>{resource.amount}</strong>
                                <span className="capitalize">
                                  &nbsp;{resource.type}
                                </span>
                              </div>
                            </Card>
                          </Fragment>
                        )
                      })}
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
