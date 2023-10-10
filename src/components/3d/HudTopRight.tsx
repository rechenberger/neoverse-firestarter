import { Github } from 'lucide-react'
import Link from 'next/link'
import { DarkModeToggle } from '../layout/DarkModeToggle'
import { Button } from '../ui/button'
import { MusicButton } from './MusicButton'

export const HudTopRight = () => {
  return (
    <>
      <div className="absolute top-4 right-4 flex flex-row gap-2">
        <GithubButton />
        <MusicButton />
        <DarkModeToggle />
      </div>
    </>
  )
}

const GithubButton = () => {
  return (
    <>
      <Link
        href="https://github.com/rechenberger/neoverse-firestarter"
        target="_blank"
      >
        <Button variant="outline" size="icon">
          <Github className="w-4 h-4" />
        </Button>
      </Link>
    </>
  )
}
