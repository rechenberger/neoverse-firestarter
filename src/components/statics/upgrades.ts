import { ResourceMap } from './resources'
import { Stats } from './stats'

export type UpgradeType = 'health' | 'drillDamage'

type UpgradeDefinition = {
  title: string
  maxLevel: number
  getDescription: (level: number) => string
  getCosts: (options: { level: number }) => ResourceMap
  modifyStats: (options: { level: number; statsBefore: Stats }) => Stats
}

export const upgradeDefinitions: Record<UpgradeType, UpgradeDefinition> = {
  health: {
    title: 'Fuel Tank',
    maxLevel: 10,
    getDescription: (level) => `+${10 * level} Health`,
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
    getDescription: (level) => `+${10 * level} Drill Damage`,
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
