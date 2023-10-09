import { ResourceMap } from './resources'
import { Stats } from './stats'

export type UpgradeType = 'health' | 'drillDamage' | 'shield' | 'discoverMoon'

type UpgradeDefinition = {
  title: string
  maxLevel: number
  getDescription: (level: number) => string
  getCosts: (options: { level: number }) => ResourceMap
  modifyStats?: (options: { level: number; statsBefore: Stats }) => Stats
  prerequisites?: UpgradeMap
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
  discoverMoon: {
    title: 'Apollo Program',
    maxLevel: 1,
    getDescription: () => `Reach for the Moon`,
    getCosts: () => ({
      iron: 30,
      silicone: 20,
      aluminum: 10,
    }),
  },
  shield: {
    title: 'Heat Shield',
    maxLevel: 10,
    getDescription: (level) => `+${10 * level} Armor`,
    getCosts: ({ level }) => ({
      iron: 10 * 2 ** (level + 10),
    }),
    modifyStats: ({ level, statsBefore }) => ({
      ...statsBefore,
      armor: statsBefore.armor + 10 * level,
    }),
    prerequisites: {
      health: 3,
    },
  },
}

export const allUpgradeTypes = Object.keys(upgradeDefinitions) as UpgradeType[]

export const allUpgradeDefinitions = allUpgradeTypes.map((type) => ({
  ...upgradeDefinitions[type],
  type,
}))

export type UpgradeMap = Partial<Record<UpgradeType, number>>
