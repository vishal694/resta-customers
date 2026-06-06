import React from 'react';
import { CartItem } from '../../types/cart';
import { formatCurrency } from '../../utils/price';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => (
  <div className="cart-item">
    <div className="item-info">
      <span className="item-name">{item.name}</span>
      <div className="quantity-controls">
        <button
          type="button"
          className="quantity-btn"
          onClick={() => onUpdateQuantity(item.id, -1)}
        >
          −
        </button>
        <input
          className="quantity-input"
          type="number"
          min={1}
          value={item.quantity}
          readOnly
          aria-label={`Quantity for ${item.name}`}
        />
        <button
          type="button"
          className="quantity-btn"
          onClick={() => onUpdateQuantity(item.id, 1)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="remove-btn"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
    <span className="item-price">
      {formatCurrency(item.price * item.quantity)}
    </span>
  </div>
);

export default CartItemRow;
