export interface Ingredient {
  name: string;
  quantity: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  isVegetarian: boolean;
  calories: number;
  totalFat: string;
}

export interface MenuCategory {
  id: number;
  key: string;
  title: string;
  subtitle: string;
}
