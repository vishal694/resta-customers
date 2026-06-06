import { useMemo, useState } from 'react';
import { CartItem } from '../types/cart';
import { MenuItem } from '../types/menu';
import { parsePrice } from '../utils/price';

const initialCart: CartItem[] = [
  { id: 101, name: 'Burger', price: 12.99, quantity: 1 },
  { id: 102, name: 'Pizza', price: 15.99, quantity: 2 },
];

export function useCart(seed: CartItem[] = initialCart) {
  const [items, setItems] = useState<CartItem[]>(seed);
  const [isOpen, setIsOpen] = useState(true);

  const addItem = (item: MenuItem, quantity: number) => {
    const price = parsePrice(item.price);
    setItems((prevItems) => {
      const existing = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevItems, { id: item.id, name: item.name, price, quantity }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const toggle = () => setIsOpen((open) => !open);
  const close = () => setIsOpen(false);

  return {
    items,
    isOpen,
    count,
    total,
    addItem,
    updateQuantity,
    removeItem,
    toggle,
    close,
    setIsOpen,
  };
}
