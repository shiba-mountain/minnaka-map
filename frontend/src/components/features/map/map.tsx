'use client'

import type { MapItems } from '~/types/map'
import type { TokenMap } from '~/types/token'
import dynamic from 'next/dynamic'
import { Skeleton } from '~/components/ui/skeleton'

interface MapProps extends MapItems {
  tokenMap?: TokenMap
}

const MapCanvas = dynamic(() => import('./map-canvas'), {
  ssr: false,
  loading: () => (
    <div className="relative h-mobile-map w-full md:h-desktop-map">
      <Skeleton className="size-full rounded-none" />
    </div>
  ),
})

export default function Map({
  midpoint,
  restaurants,
  tokenMap,
}: MapProps) {
  return (
    <MapCanvas
      midpoint={midpoint}
      restaurants={restaurants}
      tokenMap={tokenMap}
    />
  )
}
