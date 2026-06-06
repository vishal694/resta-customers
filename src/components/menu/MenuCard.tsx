import React from 'react';
import { MenuItem } from '../../types/menu';

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onQuantityChange: (id: number, value: number) => void;
  onShowIngredients: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  item,
  quantity,
  onQuantityChange,
  onShowIngredients,
  onAddToCart,
}) => (
  <article className="menu-card">
    <img className="menu-card-image" src={item.image} alt={item.name} />

    <div className="menu-card-body">
      <div className="menu-card-header">
        <div>
          <h4>{item.name}</h4>
          <p className="menu-card-subtitle">{item.description}</p>
        </div>
        {item.isVegetarian && (
          <span className="item-badge vegetarian">Veg</span>
        )}
      </div>

      <div className="nutrition-row">
        <span>{item.calories} kcal</span>
        <span>{item.totalFat}</span>
      </div>

      <button
        type="button"
        className="ingredient-toggle"
        onClick={() => onShowIngredients(item)}
      >
        View ingredients
      </button>
    </div>

    <div className="menu-card-footer">
      <div className="menu-card-price-actions">
        <span className="menu-price">{item.price}</span>
        <div className="quantity-controls-menu">
          <button
            type="button"
            className="quantity-btn-menu"
            onClick={() => onQuantityChange(item.id, quantity - 1)}
            aria-label={`Decrease quantity for ${item.name}`}
            disabled={quantity <= 1}
          >
            −
          </button>
          <input
            className="quantity-input-menu"
            type="number"
            min={1}
            value={quantity}
            onChange={(event) =>
              onQuantityChange(item.id, Number(event.target.value) || 1)
            }
            aria-label={`Quantity for ${item.name}`}
          />
          <button
            type="button"
            className="quantity-btn-menu"
            onClick={() => onQuantityChange(item.id, quantity + 1)}
            aria-label={`Increase quantity for ${item.name}`}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="add-to-cart-btn"
        onClick={() => onAddToCart(item, quantity)}
      >
        Add to cart
      </button>
    </div>
  </article>
);

export default MenuCard;
