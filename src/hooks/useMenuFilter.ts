import { useMemo } from 'react';
import { MenuItem } from '../types/menu';

export function useMenuFilter(
  items: MenuItem[],
  searchTerm: string,
  vegetarianOnly = false
) {
  return useMemo(() => {
    const query = searchTerm.toLowerCase();
    return items.filter((item) => {
      if (vegetarianOnly && !item.isVegetarian) {
        return false;
      }
      const search = `${item.name} ${item.description}`.toLowerCase();
      return query === '' || search.includes(query);
    });
  }, [items, searchTerm, vegetarianOnly]);
}
