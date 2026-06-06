import React from 'react';
import { CartItem } from '../../types/cart';
import { formatCurrency } from '../../utils/price';
import CartItemRow from './CartItemRow';

interface CartSidebarProps {
  items: CartItem[];
  total: number;
  onClose: () => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  items,
  total,
  onClose,
  onUpdateQuantity,
  onRemove,
}) => (
  <aside className="cart-menu">
    <div className="cart-header-mobile">
      <button type="button" className="cart-close-btn" onClick={onClose}>
        Back
      </button>
      <h3>Your Cart</h3>
    </div>
    <div className="cart-header-desktop">
      <h3>Your Cart</h3>
    </div>
    <div className="cart-items">
      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))
      )}
    </div>
    <div className="cart-summary">
      <div className="total">
        <strong>Total:</strong>
        <strong>{formatCurrency(total)}</strong>
      </div>
      <button type="button" className="checkout-btn">
        Checkout
      </button>
    </div>
  </aside>
);

export default CartSidebar;
