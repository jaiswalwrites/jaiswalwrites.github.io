import { useEffect, useState, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

/**
 * Smooth one-card-at-a-time carousel.
 * - Each card advances one slot at a time — never skips
 * - Slow, silky animation (duration: 60 ≈ 800ms ease)
 * - 4s auto-advance interval, pauses on hover
 * - Clicking a non-active card steps toward it one card at a time
 */
const AUTO_INTERVAL = 4500;

const useNetflixCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,   // never skip intermediate snaps
    dragFree: false,    // always snap to nearest card
    duration: 60,       // ~800ms silky ease (Embla units: 1 ≈ ~13ms)
    watchDrag: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isScrolling = useRef(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onSettled = useCallback(() => {
    isScrolling.current = false;
  }, []);

  // Wire up select + settle events
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettled);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettled);
    };
  }, [emblaApi, onSelect, onSettled]);

  // Auto-advance: one card at a time
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const id = setInterval(() => {
      if (!isScrolling.current) {
        isScrolling.current = true;
        emblaApi.scrollNext();
      }
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [emblaApi, isPaused]);

  // Horizontal wheel: one card per scroll event, debounced
  useEffect(() => {
    if (!emblaApi) return;
    let locked = false;
    const onWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      if (locked || isScrolling.current) return;
      locked = true;
      isScrolling.current = true;
      if (e.deltaX > 0) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
      setTimeout(() => { locked = false; }, 900);
    };
    const node = emblaApi.rootNode();
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [emblaApi]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  // Step ONE card toward the target index (never jump directly)
  const scrollTo = useCallback((targetIndex) => {
    if (!emblaApi || isScrolling.current) return;
    const total = emblaApi.scrollSnapList().length;
    const current = emblaApi.selectedScrollSnap();
    if (current === targetIndex) return;

    // Calculate shortest direction (clockwise vs counter-clockwise)
    const fwdDist = (targetIndex - current + total) % total;
    const bwdDist = (current - targetIndex + total) % total;

    isScrolling.current = true;
    if (fwdDist <= bwdDist) emblaApi.scrollNext();
    else emblaApi.scrollPrev();
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
