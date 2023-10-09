import { DarkModeToggle } from '../layout/DarkModeToggle'

export const HudTopRight = () => {
  return (
    <>
      <div className="absolute top-4 right-4 flex flex-row gap-2">
        {/* <Button variant="outline" size="icon">
          <Volume2 className="w-4 h-4" />
          <VolumeX className="w-4 h-4" />
        </Button> */}
        <DarkModeToggle />
      </div>
    </>
  )
}
