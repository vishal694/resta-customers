export async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      body || `Request failed (${response.status} ${response.statusText})`
    );
  }
  return response.json() as Promise<T>;
}
