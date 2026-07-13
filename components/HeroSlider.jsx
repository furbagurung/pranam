'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';

const slides = [
  { src: '/images/slider-1.png', alt: 'Pranam Agro Foods featured collection banner' },
  { src: '/images/slider-2.png', alt: 'Pranam Agro Foods natural food products banner' },
  { src: '/images/slider-3.png', alt: 'Pranam Agro Foods premium product range banner' },
];

export default function HeroSlider() {
  const [failedImages, setFailedImages] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, slidesToScroll: 1 },
    [autoplay],
  );

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', updateSelectedIndex);
    emblaApi.on('reInit', updateSelectedIndex);

    return () => {
      emblaApi.off('select', updateSelectedIndex);
      emblaApi.off('reInit', updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  useEffect(() => {
    if (!emblaApi || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    autoplay.stop();
  }, [autoplay, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section className="hero-slider-section" aria-label="Featured Pranam Agro Foods banners">
      <h1 className="sr-only">Pranam Agro Foods natural powders and fruit chips</h1>
      <div className="mx-auto w-full max-w-[93.75rem] px-3 sm:px-5 lg:px-8">
        <div
          className="hero-slider-frame"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured products"
        >
          <div className="hero-slider-viewport" ref={emblaRef}>
            <div className="hero-slider-track">
              {slides.map((slide, index) => (
                <div
                  className="hero-slider-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slides.length}`}
                  key={slide.src}
                >
                  {!failedImages[index] && (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 40rem) calc(100vw - 1.5rem), (max-width: 64rem) calc(100vw - 2.5rem), min(93.75rem, calc(100vw - 4rem))"
                      className="object-contain object-center"
                      priority={index === 0}
                      onError={() => setFailedImages((current) => ({ ...current, [index]: true }))}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button
            className="hero-slider-arrow hero-slider-arrow-prev"
            variant="outline"
            size="icon-lg"
            type="button"
            aria-label="Previous slide"
            onClick={scrollPrev}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            className="hero-slider-arrow hero-slider-arrow-next"
            variant="outline"
            size="icon-lg"
            type="button"
            aria-label="Next slide"
            onClick={scrollNext}
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>

        <div className="hero-slider-dots" aria-label="Choose a slide">
          {slides.map((slide, index) => (
            <button
              className="hero-slider-dot"
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={selectedIndex === index}
              aria-current={selectedIndex === index ? 'true' : undefined}
              onClick={() => scrollTo(index)}
              key={slide.src}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
