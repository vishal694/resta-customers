import React from 'react';
import { ShoppingCart } from '@mui/icons-material';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => (
  <header className="navbar">
    <h1 className="headline">Grand Bites</h1>
    <div className="cart-icon-container">
      <button className="cart-button" onClick={onCartClick} type="button">
        <ShoppingCart />
        <span className="cart-count">{cartCount}</span>
      </button>
    </div>
  </header>
);

export default Header;
