import { apiUrl } from './config';
import { parseJson } from './http';
import { ApiOffer } from './types';

export async function fetchOffers(): Promise<ApiOffer[]> {
  const response = await fetch(apiUrl('/api/v1.0/offers'));
  if (response.status === 404) {
    return [];
  }
  return parseJson<ApiOffer[]>(response);
}
