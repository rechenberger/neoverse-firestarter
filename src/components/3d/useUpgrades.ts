import { useMemo } from 'react'
import { useSnapshot } from 'valtio'
import { ResourceType } from '../statics/resources'
import { UpgradeType, allUpgradeDefinitions } from '../statics/upgrades'
import { metaState } from './metaState'

export const useUpgrades = () => {
  const { resources, upgrades } = useSnapshot(metaState)

  const upgradeState = useMemo(
    () =>
      allUpgradeDefinitions.map((upgradeDefinition) => {
        const upgradeLevel = upgrades[upgradeDefinition.type] || 0
        const costs = upgradeDefinition.getCosts({ level: upgradeLevel })

        const hasPrerequisites = upgradeDefinition.prerequisites
          ? Object.entries(upgradeDefinition.prerequisites).every(
              ([type, level]) => (upgrades[type as UpgradeType] || 0) >= level,
            )
          : true
        const canPay = Object.entries(costs).every(
          ([type, amount]) => (resources[type as ResourceType] || 0) >= amount,
        )
        const isMaxed = upgradeLevel >= upgradeDefinition.maxLevel
        const canUpgrade = canPay && hasPrerequisites && !isMaxed
        const show = upgradeLevel > 0 || hasPrerequisites

        const doUpgrade = () => {
          if (!canUpgrade) return
          Object.entries(costs).forEach(([type, amount]) => {
            metaState.resources[type as ResourceType]! -= amount
          })
          metaState.upgrades[upgradeDefinition.type] =
            (metaState.upgrades[upgradeDefinition.type] || 0) + 1
        }

        return {
          ...upgradeDefinition,
          level: upgradeLevel,
          isMaxed,
          costs,
          canUpgrade,
          show,
          doUpgrade,
        }
      }),
    [resources, upgrades],
  )

  return upgradeState
}

export const useCanUpgradeAny = () => {
  const upgradeState = useUpgrades()
  return upgradeState.some((upgrade) => upgrade.canUpgrade)
}

export const useHasUpgradeAny = () => {
  const upgradeState = useUpgrades()
  return upgradeState.some((upgrade) => upgrade.level > 0)
}
