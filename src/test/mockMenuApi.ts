import { ApiCategory, ApiIngredientsPage, ApiItemsPage } from '../api/types';

const mockCategories: ApiCategory[] = [
  {
    id: 4,
    key: 'starters',
    title: 'Starters',
    subtitle: 'Appetizers',
  },
];

const mockItemsPage: ApiItemsPage = {
  content: [
    {
      id: 25,
      name: 'Bruschetta al Pomodoro',
      description: 'Toasted bread with tomatoes and basil.',
      price: '$8.50',
      image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9',
      isVegetarian: true,
      calories: 260,
      totalFat: null,
    },
  ],
  last: true,
  page: 0,
  size: 10,
  totalElements: 1,
  totalPages: 1,
};

export function installMenuApiMock() {
  global.fetch = jest.fn((input: RequestInfo | URL) => {
    const url = String(input);

    if (url.includes('/api/v1.0/categories')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      } as Response);
    }

    if (/\/api\/v1\.0\/item\/\d+\/ingredients/.test(url)) {
      const mockIngredientsPage: ApiIngredientsPage = {
        content: [
          { name: 'Tomato', quantity: '100g' },
          { name: 'Basil', quantity: '5g' },
        ],
        last: true,
        page: 0,
        size: 10,
        totalElements: 2,
        totalPages: 1,
      };
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockIngredientsPage),
      } as Response);
    }

    if (url.includes('/api/v1.0/items')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockItemsPage),
      } as Response);
    }

    if (url.includes('/api/v1.0/offers')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response);
    }

    return Promise.reject(new Error(`Unhandled fetch: ${url}`));
  }) as jest.Mock;
}
