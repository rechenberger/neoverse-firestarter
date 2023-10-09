import { proxy, subscribe } from 'valtio'
import { PlanetType } from '../statics/planets'
import { ResourceMap } from '../statics/resources'
import { baseStats } from '../statics/stats'
import { UpgradeMap } from '../statics/upgrades'
import { updateStats } from './startGame'

export const metaState = proxy({
  mode: 'menu' as 'menu' | 'gameplay',
  endOfGame: null as { success: boolean } | null,
  stats: baseStats,
  resources: {} as ResourceMap,
  resourcesGathered: {} as ResourceMap,
  upgrades: {} as UpgradeMap,
  selectedPlanet: 'earth' as PlanetType,
})

if (typeof window !== 'undefined') {
  metaState.resources = JSON.parse(
    localStorage.getItem('metaState.resources') || '{}',
  )
  metaState.upgrades = JSON.parse(
    localStorage.getItem('metaState.upgrades') || '{}',
  )
  updateStats()
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
