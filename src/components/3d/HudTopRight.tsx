import { useAtom } from 'jotai/react'
import { atomWithStorage } from 'jotai/utils'
import { Music } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'
import { DarkModeToggle } from '../layout/DarkModeToggle'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Switch } from '../ui/switch'
import { metaState } from './metaState'

const musicEnabledAtom = atomWithStorage('musicEnabled', true)

export const HudTopRight = () => {
  const ref = useRef<HTMLAudioElement>(null)
  const { mode } = useSnapshot(metaState)
  const [musicEnabled, setMusicEnabled] = useAtom(musicEnabledAtom)
  const [musicPopoverOpen, setMusicPopoverOpen] = useState(false)
  useEffect(() => {
    if (musicEnabled) {
      ref.current?.play()
    } else {
      ref.current?.pause()
    }
  }, [musicEnabled, mode, musicPopoverOpen])
  return (
    <>
      <div className="absolute top-4 right-4 flex flex-row gap-2">
        <audio src="/music/cyberpunk.mp3" loop ref={ref} />
        <Popover onOpenChange={setMusicPopoverOpen}>
          <PopoverTrigger>
            <Button variant="outline" size="icon">
              <Music className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Label className="flex flex-row gap-4 items-center">
              <span className="flex-1">Music</span>
              <Switch
                checked={musicEnabled}
                onCheckedChange={setMusicEnabled}
              />
            </Label>
            <div className="text-xs opacity-60 mt-4">
              Cyberpunk Computer Game | IDRA by Alex-Productions |
              https://onsound.eu/ Music promoted by
              https://www.chosic.com/free-music/all/ Creative Commons CC BY 3.0
              https://creativecommons.org/licenses/by/3.0/
            </div>
          </PopoverContent>
        </Popover>

        <DarkModeToggle />
      </div>
    </>
  )
}
