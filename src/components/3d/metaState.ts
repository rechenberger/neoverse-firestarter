import { proxy, subscribe } from 'valtio'
import { ResourceMap } from '../statics/resources'
import { UpgradeMap } from '../statics/upgrades'

export type Stats = {
  health: number
  drillDamage: number
  armor: number
  regain: number
}

export const metaState = proxy({
  mode: 'menu' as 'menu' | 'gameplay',
  endOfGame: null as { success: boolean } | null,
  stats: {
    health: 100,
    drillDamage: 10,
    armor: 5,
    regain: 2,
  } satisfies Stats,
  resources: {} as ResourceMap,
  upgrades: {} as UpgradeMap,
})

if (typeof window !== 'undefined') {
  metaState.resources = JSON.parse(
    localStorage.getItem('metaState.resources') || '{}',
  )
  metaState.upgrades = JSON.parse(
    localStorage.getItem('metaState.upgrades') || '{}',
  )
  subscribe(metaState, () => {
    localStorage.setItem(
      'metaState.resources',
      JSON.stringify(metaState.resources),
    )
    localStorage.setItem(
      'metaState.upgrades',
      JSON.stringify(metaState.upgrades),
    )
  })
}
