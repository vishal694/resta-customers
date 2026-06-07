import { useMemo } from 'react';
import { MenuItem } from '../types/menu';

export function useMenuFilter(
  items: MenuItem[],
  searchTerm: string,
  vegetarianOnly = false,
  maxCalories: number | null = null,
  maxFat: number | null = null
) {
  return useMemo(() => {
    const query = searchTerm.toLowerCase();
    return items.filter((item) => {
      if (vegetarianOnly && !item.isVegetarian) {
        return false;
      }
      if (maxCalories !== null && item.calories > maxCalories) {
        return false;
      }
      if (maxFat !== null) {
        const fatValue = parseFloat(item.totalFat);
        if (fatValue > maxFat) {
          return false;
        }
      }
      const search = `${item.name} ${item.description}`.toLowerCase();
      return query === '' || search.includes(query);
    });
  }, [items, searchTerm, vegetarianOnly, maxCalories, maxFat]);
}
