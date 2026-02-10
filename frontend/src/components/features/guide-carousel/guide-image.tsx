'use client'

import type { StepIndex } from '~/data/guide-carousel'
import type { GuideCarousel } from '~/types/guide-carousel'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useMediaQuery } from '~/hooks/useMediaQuery'

interface Props {
  activeIndex: StepIndex
  current: GuideCarousel
}

export default function GuideImage({ activeIndex, current }: Props) {
  const isMobile = useMediaQuery('(max-width: 767px)')

  const imageProps = {
    alt: current.title || '',
    src: current.imageUrl || '',
    fill: true,
    sizes: '(max-width: 767px) 100vw, 280px',
    priority: activeIndex === 0,
    className: 'object-cover object-top',
  }

  return (
    <div className="px-5 text-center md:px-0">
      {isMobile
        ? (
            <div className="relative inline-block aspect-[2/3] w-full max-w-[280px] overflow-hidden">
              <Image {...imageProps} />
            </div>
          )
        : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative inline-block aspect-[1/2] w-full max-w-[280px] drop-shadow-xl"
              >
                <Image {...imageProps} />
              </motion.div>
            </AnimatePresence>
          )}
    </div>
  )
}
