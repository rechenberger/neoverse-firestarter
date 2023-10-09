import { Stats } from '../3d/metaState'
import { ResourceMap } from './resources'

export type UpgradeType = 'health' | 'drillDamage'

type UpgradeDefinition = {
  maxLevel: number
  description: string
  getCosts: (options: { level: number }) => ResourceMap
  modifyStats: (options: { level: number; statsBefore: Stats }) => Stats
}

export const upgradeDefinitions: Record<UpgradeType, UpgradeDefinition> = {
  health: {
    maxLevel: 10,
    description: `+10 Health / level`,
    getCosts: ({ level }) => ({
      iron: 10 * 2 ** level,
    }),
    modifyStats: ({ level, statsBefore }) => ({
      ...statsBefore,
      health: statsBefore.health + 10 * level,
    }),
  },
  drillDamage: {
    maxLevel: 10,
    description: `+10 Drill Damage / level`,
    getCosts: ({ level }) => ({
      silicone: 10 * 2 ** level,
      aluminum: 1 * 2 ** level,
    }),
    modifyStats: ({ level, statsBefore }) => ({
      ...statsBefore,
      drillDamage: statsBefore.drillDamage + 10 * level,
    }),
  },
}

export const allUpgradeTypes = Object.keys(upgradeDefinitions) as UpgradeType[]

export const allUpgradeDefinitions = allUpgradeTypes.map((type) => ({
  ...upgradeDefinitions[type],
  type,
}))

export type UpgradeMap = Partial<Record<UpgradeType, number>>
