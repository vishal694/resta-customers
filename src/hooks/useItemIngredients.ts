import { useEffect, useState } from 'react';
import { fetchItemIngredients } from '../api/ingredientsApi';
import { Ingredient } from '../types/menu';

interface UseItemIngredientsResult {
  ingredients: Ingredient[];
  loading: boolean;
  error: string | null;
}

export function useItemIngredients(
  itemId: number | null
): UseItemIngredientsResult {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (itemId === null) {
      setIngredients([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    const id = itemId;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const apiIngredients = await fetchItemIngredients(id);
        if (!cancelled) {
          setIngredients(apiIngredients);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load ingredients'
          );
          setIngredients([]);
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
  }, [itemId]);

  return { ingredients, loading, error };
}
