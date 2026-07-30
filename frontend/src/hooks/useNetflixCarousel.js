import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

/**
 * Netflix-style carousel hook.
 * - Smooth clockwise auto-advance at Netflix speed (~4s interval)
 * - Cyclic distance calculation to prevent card overlapping or floating during drag
 * - Pauses on hover, resumes on leave
 * - One card at a time
 */
const NETFLIX_INTERVAL = 4000;

const useNetflixCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    duration: 35,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Wire up select event
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-advance: clockwise (scrollNext) at Netflix speed
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, NETFLIX_INTERVAL);
    return () => clearInterval(id);
  }, [emblaApi, isPaused]);

  // Wheel: horizontal scroll = one card at a time, debounced
  useEffect(() => {
    if (!emblaApi) return;
    let locked = false;
    const onWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      if (e.deltaX > 0) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
      setTimeout(() => { locked = false; }, 500);
    };
    const node = emblaApi.rootNode();
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [emblaApi]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

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
