import { ResourceMap } from './resources'
import { Stats } from './stats'

export type UpgradeType = 'health' | 'drillDamage'

type UpgradeDefinition = {
  title: string
  description: string
  maxLevel: number
  getCosts: (options: { level: number }) => ResourceMap
  modifyStats: (options: { level: number; statsBefore: Stats }) => Stats
}

export const upgradeDefinitions: Record<UpgradeType, UpgradeDefinition> = {
  health: {
    title: 'Fuel Tank',
    description: `+10 Health`,
    maxLevel: 10,
    getCosts: ({ level }) => ({
      iron: 10 * 2 ** level,
    }),
    modifyStats: ({ level, statsBefore }) => ({
      ...statsBefore,
      health: statsBefore.health + 10 * level,
    }),
  },
  drillDamage: {
    title: 'Drill Coating',
    description: `+10 Drill Damage`,
    maxLevel: 10,
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
