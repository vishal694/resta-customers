import { useEffect, useState } from 'react';
import { fetchItemsByCategory } from '../api/menuApi';
import { mapApiItem } from '../api/mapMenu';
import { MenuItem } from '../types/menu';

interface UseMenuItemsResult {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

export function useMenuItems(categoryId: number): UseMenuItemsResult {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const apiItems = await fetchItemsByCategory(categoryId);
        if (!cancelled) {
          setItems(apiItems.map(mapApiItem));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load menu items'
          );
          setItems([]);
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
  }, [categoryId]);

  return { items, loading, error };
}
