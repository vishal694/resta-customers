import React, { useEffect, useState } from 'react';
import './styles/index.css';
import CartSidebar from './components/cart/CartSidebar';
import Header from './components/layout/Header';
import MenuCategories from './components/menu/MenuCategories';
import OfferCarousel from './components/offers/OfferCarousel';
import { useCart } from './hooks/useCart';
import { useOfferCarousel } from './hooks/useOfferCarousel';
import { useOffers } from './hooks/useOffers';
import { MenuItem } from './types/menu';

function App() {
  const cart = useCart();
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const { slides: offerSlides } = useOffers();
  const offers = useOfferCarousel(offerSlides);

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    cart.addItem(item, quantity);
    setNotification(`Added ${quantity} × ${item.name} to cart`);
    setShowNotification(true);
  };

  useEffect(() => {
    if (!showNotification) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowNotification(false);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [showNotification]);

  return (
    <div className={`App ${cart.isOpen ? 'cart-open' : ''}`}>
      <div className="main-container">
        <Header cartCount={cart.count} onCartClick={cart.toggle} />

        <div className="content-wrapper">
          <main className="main-content">
            {offers.currentSlide && (
              <OfferCarousel
                slide={offers.currentSlide}
                currentIndex={offers.currentIndex}
                slideCount={offers.slideCount}
                onNavigate={offers.navigate}
                onGoTo={offers.goTo}
              />
            )}
            <MenuCategories onAddToCart={handleAddToCart} />
          </main>

          {cart.isOpen && (
            <CartSidebar
              items={cart.items}
              total={cart.total}
              onClose={cart.close}
              onUpdateQuantity={cart.updateQuantity}
              onRemove={cart.removeItem}
            />
          )}
        </div>
      </div>

      {showNotification && (
        <div className="toast-notification" role="status" aria-live="polite">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;
