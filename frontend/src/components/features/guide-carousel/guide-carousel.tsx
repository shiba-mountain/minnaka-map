'use client'

import type { StepIndex } from '~/data/guide-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel'
import { guideCarousel } from '~/data/guide-carousel'
import { useGuideCarousel } from '~/hooks/useGuideCarousel'
import GuideDescription from './guide-description'
import GuideHeading from './guide-heading'
import GuideImage from './guide-image'
import GuideStep from './guide-step'

export default function GuideCarousel() {
  const { activeIndex, startSequenceFrom } = useGuideCarousel()
  const current = guideCarousel[activeIndex]

  return (
    <>
      {/* PC */}
      <div className="hidden md:grid md:grid-cols-2">
        <GuideImage activeIndex={activeIndex} current={current} />
        <div className="md:grid md:h-[560px] md:grid-rows-10">
          <GuideHeading />
          <GuideStep activeIndex={activeIndex} startSequenceFrom={startSequenceFrom} />
        </div>
      </div>

      {/* SP */}
      <div className="md:hidden">
        <GuideHeading />
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
          className="mx-auto max-w-96"
        >
          <CarouselContent>
            {guideCarousel.map((item, index) => (
              <CarouselItem key={item.title}>
                <GuideImage activeIndex={index as StepIndex} current={item} />
                <GuideDescription data={item} displayStep={index + 1} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-1/3" />
          <CarouselNext className="right-2 top-1/3" />
        </Carousel>
      </div>
    </>
  )
}
