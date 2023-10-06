import { useEffect, useState } from 'react'
import { Vector3 } from 'three'

export const useDeviceOrientationSupported = () => {
  const [supported, setSupported] = useState(true)
  const [needsPermission, setNeedsPermission] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('DeviceOrientationEvent' in window)) return
    setSupported(true)
  }, [])

  const request = () => {
    if (typeof window === 'undefined') return
    if (!('DeviceOrientationEvent' in window)) return

    if (
      'requestPermission' in DeviceOrientationEvent &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      DeviceOrientationEvent.requestPermission().then((res: any) => {
        if (res === 'granted') {
          // Success!
          setNeedsPermission(false)
        }
      })
    } else {
      setNeedsPermission(false)
    }
  }

  return {
    supported,
    needsPermission,
    request,
  }
}

export const useDeviceOrientation = () => {
  const supported = useDeviceOrientationSupported()

  const [orientation, setOrientation] = useState<DeviceOrientationEvent | null>(
    null,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('DeviceOrientationEvent' in window)) return
    const handler = setOrientation
    window.addEventListener('deviceorientation', handler)
    return () => {
      window.removeEventListener('deviceorientation', handler)
    }
  }, [])

  return { ...supported, orientation }
}

export const useDeviceOrientationInput = () => {
  const base = useDeviceOrientation()
  let gamma = base.orientation?.gamma
  const beta = base.orientation?.beta
  if (typeof gamma !== 'number' || typeof beta !== 'number') {
    return { ...base, vector: null }
  }
  if (Math.abs(beta) > 90) {
    gamma = -gamma
  }
  let x = gamma / 90
  x *= 3
  x = Math.min(Math.max(x, -1), 1)
  const vector = new Vector3(x, 0, 0)
  return { ...base, vector }
}
