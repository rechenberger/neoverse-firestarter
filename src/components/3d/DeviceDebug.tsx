'use client'

import { Button } from '../ui/button'
import { useDeviceOrientationInput } from './useDeviceOrientationInput'

export const DeviceDebug = () => {
  const orioentation = useDeviceOrientationInput()
  return (
    <>
      <Button onClick={() => orioentation.request()}>Request</Button>
      <pre className="border p-4">{JSON.stringify(orioentation, null, 2)}</pre>
    </>
  )
}
