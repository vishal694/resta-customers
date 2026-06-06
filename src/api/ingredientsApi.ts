import { apiUrl } from './config';
import { parseJson } from './http';
import { ApiIngredient, ApiIngredientsPage } from './types';

export async function fetchItemIngredients(
  itemId: number
): Promise<ApiIngredient[]> {
  const ingredients: ApiIngredient[] = [];
  let page = 0;
  let last = false;

  while (!last) {
    const params = new URLSearchParams({
      page: String(page),
      size: '100',
    });
    const response = await fetch(
      apiUrl(`/api/v1.0/item/${itemId}/ingredients?${params}`)
    );
    if (response.status === 404) {
      return [];
    }
    const data = await parseJson<ApiIngredientsPage>(response);
    ingredients.push(...data.content);
    last = data.last;
    page += 1;
  }

  return ingredients;
}
