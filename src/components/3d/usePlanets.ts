import { useMemo } from 'react'
import { useSnapshot } from 'valtio'
import { allPlanetDefinitions } from '../statics/planets'
import { UpgradeType } from '../statics/upgrades'
import { metaState } from './metaState'

export const usePlanets = () => {
  const { upgrades } = useSnapshot(metaState)

  const upgradeState = useMemo(
    () =>
      allPlanetDefinitions.map((planet) => {
        const hasPrerequisites = planet.prerequisites
          ? Object.entries(planet.prerequisites).every(
              ([type, level]) => (upgrades[type as UpgradeType] || 0) >= level,
            )
          : true

        const canSelect = hasPrerequisites
        const show = hasPrerequisites

        const select = () => {
          if (!canSelect) return
          metaState.selectedPlanet = planet.type
        }

        return {
          ...planet,
          canSelect,
          show,
          select,
        }
      }),
    [upgrades],
  )

  return upgradeState
}

export const useShowPlanetSelection = () => {
  const planets = usePlanets()
  return planets.filter((planet) => planet.show).length > 1
}
