import { indexOf, orderBy } from 'lodash-es'
import { ResourceType } from './resources'

export type PlanetType = 'earth' | 'moon'

type PlanetDefinition = {
  color: string
  layers: {
    size: number
    resourceType: ResourceType
    resourceAmount: number
    health: number
  }[]
}

export const planetDefinitions: Record<PlanetType, PlanetDefinition> = {
  earth: {
    color: '#1e40af',
    layers: [
      {
        size: 6,
        resourceType: 'iron',
        resourceAmount: 1,
        health: 10,
      },
      {
        size: 4,
        resourceType: 'silicone',
        resourceAmount: 1,
        health: 20,
      },
      {
        size: 2,
        resourceType: 'aluminum',
        resourceAmount: 1,
        health: 40,
      },
    ],
  },
  moon: {
    color: '#737373',
    layers: [],
  },
}

export const allPlanetTypes = Object.keys(planetDefinitions) as PlanetType[]

export const allPlanetDefinitions = allPlanetTypes.map((type) => ({
  ...planetDefinitions[type],
  type,
}))

export type PlanetMap = Partial<Record<PlanetType, number>>

export const displayPlanetMap = (planetMap: PlanetMap) => {
  let entries = Object.entries(planetMap).map(([t, amount]) => {
    const type = t as PlanetType
    const definition = planetDefinitions[type]
    return {
      type,
      definition,
      amount,
    }
  })
  entries = orderBy(entries, (e) => indexOf(allPlanetTypes, e.type), 'asc')
  return entries
}
