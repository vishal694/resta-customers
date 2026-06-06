import { useEffect, useState } from 'react';
import { fetchOffers } from '../api/offersApi';
import { OfferSlide } from '../types/offer';

interface UseOffersResult {
  slides: OfferSlide[];
  loading: boolean;
  error: string | null;
}

export function useOffers(): UseOffersResult {
  const [slides, setSlides] = useState<OfferSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const offers = await fetchOffers();
        if (!cancelled) {
          setSlides(offers);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load offers'
          );
          setSlides([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { slides, loading, error };
}
