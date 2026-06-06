import React from 'react';
import { OfferSlide } from '../../types/offer';

interface OfferCarouselProps {
  slide: OfferSlide;
  currentIndex: number;
  slideCount: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  onGoTo: (index: number) => void;
}

const OfferCarousel: React.FC<OfferCarouselProps> = ({
  slide,
  currentIndex,
  slideCount,
  onNavigate,
  onGoTo,
}) => (
  <div className="offer-carousel">
    <div className="offer-slide-wrapper">
      <div
        className="offer-slide"
        style={{ backgroundColor: slide.accent }}
        aria-live="polite"
      >
        <span className="offer-badge">{slide.badge}</span>
        <div className="offer-copy">
          <strong>{slide.title}</strong>
          <p>{slide.description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default OfferCarousel;
