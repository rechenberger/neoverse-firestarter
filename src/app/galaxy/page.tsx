'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Galaxy = dynamic(() => import('@/components/3d/Galaxy'), {
  ssr: false,
})

export default function Page() {
  return (
    <>
      <div className="relative h-[100svh]">
        <Suspense>
          <Galaxy />
        </Suspense>
      </div>
    </>
  )
}
