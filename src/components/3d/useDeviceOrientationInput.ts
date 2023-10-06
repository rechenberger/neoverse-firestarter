import { useEffect, useState } from 'react'
import { Vector3 } from 'three'

export const useDeviceOrientation = () => {
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
        }
      })
    }
  }

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

  return { orientation, request }
}

export const useDeviceOrientationInput = () => {
  const { orientation, request } = useDeviceOrientation()
  let gamma = orientation?.gamma
  const beta = orientation?.beta
  if (typeof gamma !== 'number' || typeof beta !== 'number') {
    return { orientation, vector: new Vector3(), request }
  }
  if (Math.abs(beta) > 90) {
    gamma = -gamma
  }
  let x = gamma / 90
  x *= 3
  x = Math.min(Math.max(x, -1), 1)
  const vector = new Vector3(x, 0, 0)
  return { orientation, vector, request }
}
