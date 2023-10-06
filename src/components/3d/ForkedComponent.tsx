import React, { ReactNode, useEffect, useRef } from 'react'
import { ECS, Entity, world } from './world'

// FROM: https://github.com/hmans/miniplex/blob/f40b96cd702148b0c23a9c1e141ae0fd615ac6fc/packages/react/src/createReactAPI.tsx#L122-L156
export const ForkedECSComponent = (props: {
  name: keyof Entity
  data?: any
  children?: ReactNode
}) => {
  const entity: any = ECS.useCurrentEntity()
  const ref = useRef<any>(null!)

  if (!entity) {
    throw new Error('<Component> must be a child of <Entity>')
  }

  /* Handle creation and removal of component with a value prop */
  useEffect(() => {
    // changed from useLayoutEffect to useEffect
    world.addComponent(entity, props.name, props.data || ref.current)
    return () => world.removeComponent(entity, props.name)
  }, [entity, props.name])

  /* Handle updates to existing component */
  useEffect(() => {
    // changed from useLayoutEffect to useEffect
    if (props.data === undefined) return
    entity[props.name] = (props.data || ref.current) as any
  }, [entity, props.name, props.data, ref.current])

  /* Handle setting of child value */
  if (props.children) {
    const child = React.Children.only(props.children) as any

    return React.cloneElement(child, {
      ref: mergeRefs([(child as any).ref, ref]),
    })
  }

  return null
}

// FROM: https://github.com/hmans/miniplex/blob/f40b96cd702148b0c23a9c1e141ae0fd615ac6fc/packages/react/src/lib/mergeRefs.ts#L3C1-L10C4
export const mergeRefs =
  (refs: Array<React.Ref<any>>): React.Ref<any> =>
  (v: any) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(v)
      else if (!!ref) (ref as any).current = v
    })
  }
