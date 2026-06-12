import { useEffect, useMemo, useState } from 'react';
import { CartItem } from '../types/cart';
import { MenuItem } from '../types/menu';
import { parsePrice } from '../utils/price';

const STORAGE_KEY = 'resta_customers_current_session';

type SessionShape = {
  sessionId: string;
  tableId: string;
  cartItems: CartItem[];
  createdAt: string;
};

const getTableIdFromUrl = (): string => {
  const searchParams = new URLSearchParams(window.location.search);
  return (
    searchParams.get('table') ??
    searchParams.get('table_id') ??
    searchParams.get('tableId') ??
    'unknown'
  );
};

const generateSessionId = (): string =>
  `sess_${Math.random().toString(36).slice(2)}_${Date.now()}`;

const loadSession = (): SessionShape | null => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionShape;
  } catch {
    return null;
  }
};

const saveSession = (session: SessionShape) => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore storage errors
  }
};

const createSession = (tableId: string): SessionShape => ({
  sessionId: generateSessionId(),
  tableId,
  cartItems: [],
  createdAt: new Date().toISOString(),
});

const initialCart: CartItem[] = [];

export function useCart(seed: CartItem[] = initialCart) {
  // initialize from existing session if available and matching table
  const initialItems = (() => {
    const tableId = getTableIdFromUrl();
    const session = loadSession();
    if (session && session.tableId === tableId) {
      return session.cartItems;
    }
    // if no matching session, allow seed fallback
    return seed;
  })();

  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isOpen, setIsOpen] = useState(true);

  // ensure there's a session saved so external systems can read metadata
  useEffect(() => {
    const tableId = getTableIdFromUrl();
    let session = loadSession();
    if (!session || session.tableId !== tableId) {
      session = createSession(tableId);
    }
    // make sure cartItems reflect current items
    session.cartItems = items;
    saveSession(session);
  }, [items]);

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
      return [...prevItems, { id: item.id, name: item.name, price, quantity, image: item.image }];
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
