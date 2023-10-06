'use client'

import { Button } from '../ui/button'
import { useDeviceOrientationInput } from './useDeviceOrientationInput'

export const DeviceDebug = () => {
  const { orientation, request, vector } = useDeviceOrientationInput()
  return (
    <>
      <Button onClick={() => request()}>Request</Button>
      <pre className="border p-4">
        {JSON.stringify(
          {
            absolute: orientation?.absolute,
            alpha: orientation?.alpha,
            beta: orientation?.beta,
            gamma: orientation?.gamma,
          },
          null,
          2,
        )}
      </pre>
      <pre className="border p-4">{JSON.stringify(vector, null, 2)}</pre>
    </>
  )
}
