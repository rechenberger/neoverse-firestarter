import { map } from 'lodash-es'
import { Fragment } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { ResourceType, resourceDefinitions } from '../statics/resources'
import { allUpgradeDefinitions } from '../statics/upgrades'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { metaState } from './metaState'

export const upgradeMenuState = proxy({
  open: false,
})

export const UpgradeMenu = () => {
  const state = useSnapshot(upgradeMenuState)
  const { resources, upgrades } = useSnapshot(metaState)
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
            {allUpgradeDefinitions.map((upgradeDefinition) => {
              const upgradeLevel = upgrades[upgradeDefinition.type] || 0
              const costs = upgradeDefinition.getCosts({ level: upgradeLevel })
              const canUpgrade = Object.entries(costs).every(
                ([type, amount]) =>
                  (resources[type as ResourceType] || 0) >= amount,
              )
              const doUpgrade = () => {
                if (!canUpgrade) return
                Object.entries(costs).forEach(([type, amount]) => {
                  metaState.resources[type as ResourceType]! -= amount
                })
                metaState.upgrades[upgradeDefinition.type] =
                  (metaState.upgrades[upgradeDefinition.type] || 0) + 1
              }
              return (
                <Fragment key={upgradeDefinition.type}>
                  <Card className="flex flex-col items-stretch gap-2 px-2 py-1">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="flex-1">
                        <div className="flex flex-row">
                          <div className="font-bold capitalize flex-1">
                            {upgradeDefinition.type}
                          </div>
                          <div className="text-sm opacity-60">
                            {upgradeLevel}/{upgradeDefinition.maxLevel}
                          </div>
                        </div>
                        <div className="text-sm opacity-60">
                          {upgradeDefinition.description}
                        </div>
                      </div>
                      {/* <Shield className="w-8 h-8 opacity-60" /> */}
                    </div>
                    <Button
                      className="px-1 py-1 flex flex-col gap-1 h-auto items-stretch"
                      disabled={!canUpgrade}
                      variant={canUpgrade ? 'default' : 'secondary'}
                      onClick={() => doUpgrade()}
                    >
                      {map(costs, (amount: number, type: ResourceType) => {
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
