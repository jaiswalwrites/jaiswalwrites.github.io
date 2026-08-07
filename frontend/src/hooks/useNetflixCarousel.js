import { useEffect, useState, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

/**
 * Clean one-card-at-a-time carousel.
 * - Embla's native skipSnaps:false + dragFree:false handles drag snapping reliably
 * - No isScrolling lock (that caused cards to get stuck needing 4-5 swipes)
 * - Simple debounce only for wheel/auto-advance to prevent double-fire
 */
const AUTO_INTERVAL = 4500;
const WHEEL_DEBOUNCE = 600;

const useNetflixCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    duration: 50,       // ~650ms smooth — fast enough to feel responsive
    watchDrag: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wheelLock = useRef(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-advance — simple interval, no lock needed (Embla queues internally)
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const id = setInterval(() => emblaApi.scrollNext(), AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [emblaApi, isPaused]);

  // Horizontal wheel: debounce per-event only (not per-animation)
  useEffect(() => {
    if (!emblaApi) return;
    const onWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      if (e.deltaX > 0) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
      setTimeout(() => { wheelLock.current = false; }, WHEEL_DEBOUNCE);
    };
    const node = emblaApi.rootNode();
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [emblaApi]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  // Direct scroll — let Embla handle animation; clicking non-active card snaps to it
  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const reInit = useCallback(() => {
    if (emblaApi) {
      emblaApi.reInit();
      setSelectedIndex(0);
    }
  }, [emblaApi]);

  const getDistance = useCallback((index, totalLength) => {
    if (!totalLength || totalLength <= 1) return 0;
    const diff = Math.abs(index - selectedIndex);
    return Math.min(diff, totalLength - diff);
  }, [selectedIndex]);

  return { emblaRef, emblaApi, selectedIndex, pause, resume, scrollTo, reInit, getDistance };
};

export default useNetflixCarousel;
