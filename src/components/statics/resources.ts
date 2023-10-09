export type ResourceType = 'iron' | 'silicone' | 'aluminum'

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
}

export const allResourceTypes = Object.keys(
  resourceDefinitions,
) as ResourceType[]

export const allResourceDefinitions = allResourceTypes.map((type) => ({
  ...resourceDefinitions[type],
  type,
}))

export type ResourceMap = Partial<Record<ResourceType, number>>
