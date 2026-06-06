import { useEffect, useState } from 'react';
import { fetchCategories } from '../api/menuApi';
import { mapApiCategory } from '../api/mapMenu';
import { MenuCategory } from '../types/menu';

interface UseMenuCategoriesResult {
  categories: MenuCategory[];
  loading: boolean;
  error: string | null;
}

export function useMenuCategories(): UseMenuCategoriesResult {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const apiCategories = await fetchCategories();
        const mapped = apiCategories.map(mapApiCategory);

        if (!cancelled) {
          setCategories(mapped);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load menu'
          );
          setCategories([]);
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

  return { categories, loading, error };
}
