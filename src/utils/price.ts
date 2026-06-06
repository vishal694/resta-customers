export const parsePrice = (price: string): number =>
  Number(price.replace(/[^0-9.]/g, '')) || 0;

export const formatCurrency = (amount: number): string =>
  `$${amount.toFixed(2)}`;
