'use client'

import type { StepIndex } from '~/data/guide-carousel'
import { useCallback, useEffect, useState } from 'react'
import { guideCarousel } from '~/data/guide-carousel'

const INTERVAL = 5000

export function useGuideCarousel() {
  const [activeIndex, setActiveIndex] = useState<StepIndex>(0)

  useEffect(() => {
    const length = guideCarousel.length
    if (length <= 1)
      return

    const timerId = setTimeout(() => {
      setActiveIndex(currentIndex => ((currentIndex + 1) % length) as StepIndex)
    }, INTERVAL)

    return () => clearTimeout(timerId)
  }, [activeIndex])

  const startSequenceFrom = useCallback((index: StepIndex) => setActiveIndex(index), [])

  return { activeIndex, startSequenceFrom } as const
}
