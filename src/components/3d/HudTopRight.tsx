import { DarkModeToggle } from '../layout/DarkModeToggle'
import { MusicButton } from './MusicButton'

export const HudTopRight = () => {
  return (
    <>
      <div className="absolute top-4 right-4 flex flex-row gap-2">
        <MusicButton />
        <DarkModeToggle />
      </div>
    </>
  )
}
