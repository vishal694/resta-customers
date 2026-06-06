import React from 'react';
import { MenuItem } from '../../types/menu';
import MenuCard from './MenuCard';

interface MenuGridProps {
  items: MenuItem[];
  quantities: Record<number, number>;
  onQuantityChange: (id: number, value: number) => void;
  onShowIngredients: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  quantities,
  onQuantityChange,
  onShowIngredients,
  onAddToCart,
}) => (
  <div className="menu-wrapper">
    <div className="menu-grid">
      {items.length === 0 ? (
        <div className="no-results">No matching menu items found.</div>
      ) : (
        items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            quantity={quantities[item.id] || 1}
            onQuantityChange={onQuantityChange}
            onShowIngredients={onShowIngredients}
            onAddToCart={onAddToCart}
          />
        ))
      )}
    </div>
  </div>
);

export default MenuGrid;
