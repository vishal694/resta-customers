import { ApiCategory, ApiMenuItem } from './types';
import { MenuCategory, MenuItem } from '../types/menu';

export function mapApiItem(item: ApiMenuItem): MenuItem {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    isVegetarian: item.isVegetarian,
    calories: item.calories,
    totalFat: item.totalFat ?? '—',
  };
}

export function mapApiCategory(category: ApiCategory): MenuCategory {
  return {
    id: category.id,
    key: category.key,
    title: category.title,
    subtitle: category.subtitle,
  };
}
