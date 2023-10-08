import { Entity } from './world'

export const changeHealth = (entity: Entity, dif: number) => {
  if (!entity.health) {
    throw new Error('Entity does not have health')
  }
  entity.health.current += dif
  if (typeof entity.health.max === 'number') {
    if (entity.health.current > entity.health.max) {
      entity.health.current = entity.health.max
    }
  }
  if (entity.health.current <= 0) {
    entity.health.current = 0
  }
}
