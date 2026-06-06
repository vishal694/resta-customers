export interface ApiCategory {
  id: number;
  key: string;
  title: string;
  subtitle: string;
}

export interface ApiMenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  isVegetarian: boolean;
  calories: number;
  totalFat: string | null;
}

export interface ApiItemsPage {
  content: ApiMenuItem[];
  last: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ApiOffer {
  title: string;
  description: string;
  badge: string;
  action: string;
  accent: string;
}

export interface ApiIngredient {
  name: string;
  quantity: string;
}

export interface ApiIngredientsPage {
  content: ApiIngredient[];
  last: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
