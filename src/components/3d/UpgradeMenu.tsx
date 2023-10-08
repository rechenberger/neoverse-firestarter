import { proxy, useSnapshot } from 'valtio'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'

export const upgradeMenuState = proxy({
  open: false,
})

export const UpgradeMenu = () => {
  const state = useSnapshot(upgradeMenuState)
  return (
    <>
      <Sheet
        open={state.open}
        onOpenChange={(open) => (upgradeMenuState.open = open)}
      >
        <SheetContent
          className="w-[400px] sm:w-[540px] mx-auto rounded-t-xl"
          side={'bottom'}
        >
          <SheetHeader>
            <SheetTitle>Upgrades</SheetTitle>
            <SheetDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              quam fugiat ipsa alias veniam a fugit esse deleniti ullam,
              dolorum, dolor blanditiis, natus eos hic quas officia facere et
              distinctio?
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}
