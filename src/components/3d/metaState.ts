import { proxy, subscribe } from 'valtio'
import { ResourceMap } from '../statics/resources'

export const metaState = proxy({
  mode: 'menu' as 'menu' | 'gameplay',
  endOfGame: null as { success: boolean } | null,
  stats: {
    health: 100,
    drillDamage: 10,
    armor: 5,
    regain: 2,
  },
  resources: {} as ResourceMap,
})

if (typeof window !== 'undefined') {
  metaState.resources = JSON.parse(
    localStorage.getItem('metaState.resources') || '{}',
  )
  subscribe(metaState, () => {
    localStorage.setItem(
      'metaState.resources',
      JSON.stringify(metaState.resources),
    )
  })
}
