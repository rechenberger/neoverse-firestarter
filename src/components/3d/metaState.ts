import { proxy } from 'valtio'
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
