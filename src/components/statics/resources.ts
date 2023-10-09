import { indexOf, orderBy } from 'lodash-es'

export type ResourceType =
  | 'iron'
  | 'silicone'
  | 'aluminum'
  | 'rock'
  | 'coal'
  | 'sulfur'

type ResourceDefinition = {
  color: string
}

export const resourceDefinitions: Record<ResourceType, ResourceDefinition> = {
  iron: {
    color: '#737373',
  },
  silicone: {
    color: '#eab308',
  },
  aluminum: {
    color: '#ef4444',
  },
  rock: {
    color: '#a3a3a3',
  },
  coal: {
    color: '#27272a',
  },
  sulfur: {
    color: '#605F4A',
  },
}

export const allResourceTypes = Object.keys(
  resourceDefinitions,
) as ResourceType[]

export const allResourceDefinitions = allResourceTypes.map((type) => ({
  ...resourceDefinitions[type],
  type,
}))

export type ResourceMap = Partial<Record<ResourceType, number>>

export const displayResourceMap = (resourceMap: ResourceMap) => {
  let entries = Object.entries(resourceMap).map(([t, amount]) => {
    const type = t as ResourceType
    const definition = resourceDefinitions[type]
    return {
      type,
      definition,
      amount,
    }
  })
  entries = orderBy(entries, (e) => indexOf(allResourceTypes, e.type), 'asc')
  return entries
}
