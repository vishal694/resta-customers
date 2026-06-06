import { useEffect, useState } from 'react';
import { OfferSlide } from '../types/offer';

export function useOfferCarousel(slides: OfferSlide[], intervalMs = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [slides]);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(interval);
  }, [slides.length, intervalMs]);

  const goTo = (index: number) => {
    if (slides.length === 0) {
      return;
    }
    setCurrentIndex((index + slides.length) % slides.length);
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (slides.length === 0) {
      return;
    }
    setCurrentIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? slides.length - 1 : prev - 1;
      }
      return (prev + 1) % slides.length;
    });
  };

  return {
    currentSlide: slides[currentIndex] ?? null,
    currentIndex,
    goTo,
    navigate,
    slideCount: slides.length,
  };
}
