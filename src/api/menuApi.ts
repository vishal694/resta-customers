import { apiUrl } from './config';
import { parseJson } from './http';
import { ApiCategory, ApiItemsPage, ApiMenuItem } from './types';

export async function fetchCategories(): Promise<ApiCategory[]> {
  const response = await fetch(apiUrl('/api/v1.0/categories'));
  return parseJson<ApiCategory[]>(response);
}

export async function fetchItemsByCategory(
  categoryId: number
): Promise<ApiMenuItem[]> {
  const items: ApiMenuItem[] = [];
  let page = 0;
  let last = false;

  while (!last) {
    const params = new URLSearchParams({
      categoryid: String(categoryId),
      page: String(page),
      size: '100',
    });
    const response = await fetch(apiUrl(`/api/v1.0/items?${params}`));
    const data = await parseJson<ApiItemsPage>(response);
    items.push(...data.content);
    last = data.last;
    page += 1;
  }

  return items;
}
