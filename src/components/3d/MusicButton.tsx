import { useAtom } from 'jotai/react'
import { atomWithStorage } from 'jotai/utils'
import { Music } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Slider } from '../ui/slider'
import { metaState } from './metaState'

const musicVolumeAtom = atomWithStorage('musicVolume', 50)

export const MusicButton = () => {
  const ref = useRef<HTMLAudioElement>(null)
  const { mode } = useSnapshot(metaState)
  const [volume, setVolume] = useAtom(musicVolumeAtom)
  const [musicPopoverOpen, setMusicPopoverOpen] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    if (volume) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
    ref.current.volume = volume / 100
  }, [volume, mode, musicPopoverOpen])
  return (
    <>
      <audio src="/music/cyberpunk.mp3" loop ref={ref} />
      <Popover onOpenChange={setMusicPopoverOpen}>
        <PopoverTrigger>
          <Button variant="outline" size="icon">
            <Music className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mx-4">
          <Label className="flex flex-row gap-4 items-center">
            <span className="flex-1">Music</span>
            <Slider
              value={[volume]}
              onValueChange={(v) => setVolume(v[0])}
              max={100}
              step={1}
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
    </>
  )
}
