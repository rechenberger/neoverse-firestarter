import { useCallback, useEffect, useMemo, useState } from 'react'
import { Vector3 } from 'three'

export const useKeyboardInput = () => {
  const [keys, setKeys] = useState<Record<string, boolean | undefined>>({})

  const keyDown = useCallback(
    (e: KeyboardEvent) => {
      // e.preventDefault()
      setKeys((keys) => ({ ...keys, [e.key]: true }))
    },
    [setKeys],
  )

  const keyUp = useCallback(
    (e: KeyboardEvent) => {
      // e.preventDefault()
      setKeys((keys) => ({ ...keys, [e.key]: false }))
    },
    [setKeys],
  )

  useEffect(() => {
    window.addEventListener('keydown', keyDown, { passive: true })
    window.addEventListener('keyup', keyUp, { passive: true })
    return () => {
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
    }
  }, [keyDown, keyUp])

  return keys
}

export const useKeyboardMovementDirection = () => {
  const { w, a, s, d, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } =
    useKeyboardInput()

  const direction = useMemo(() => {
    let direction = new Vector3()
    if (w || ArrowUp) direction.z -= 1
    if (s || ArrowDown) direction.z += 1
    if (a || ArrowLeft) direction.x -= 1
    if (d || ArrowRight) direction.x += 1
    if (direction.length() > 0) direction = direction.normalize()
    return direction
  }, [w, ArrowUp, s, ArrowDown, a, ArrowLeft, d, ArrowRight])

  return direction
}
