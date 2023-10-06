'use client'

import { Redo, Smartphone, Undo } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog'
import { useDeviceOrientationSupported } from './useDeviceOrientationInput'

export const DeviceOrientationDialog = () => {
  const { request, supported, needsPermission } =
    useDeviceOrientationSupported()
  if (!supported || !needsPermission) return null
  return (
    <>
      <Dialog open>
        <DialogContent>
          <div className="flex flex-row gap-0.5 center w-full justify-center">
            <Undo className="w-6 h-6 -rotate-12" />
            <Smartphone className="w-8 h-8" />
            <Redo className="w-6 h-6 rotate-12" />
          </div>
          <DialogTitle className="text-center">Mobile Controls</DialogTitle>
          <DialogDescription className="text-center">
            Tilt your Phone to left and right to control the spaceship.
          </DialogDescription>
          {/* <div>Supported: {supported.toString()}</div>
          <div>needsPermission: {needsPermission.toString()}</div> */}
          <Button onClick={() => request()}>Grant Permission</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
