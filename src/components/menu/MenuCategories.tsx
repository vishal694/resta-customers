import React, { useEffect, useMemo, useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Switch from '@mui/material/Switch';
import { useMenuCategories } from '../../hooks/useMenuCategories';
import { useMenuFilter } from '../../hooks/useMenuFilter';
import { useMenuItems } from '../../hooks/useMenuItems';
import { MenuItem } from '../../types/menu';
import CategoryTabs, { CategoryTab } from './CategoryTabs';
import IngredientModal from './IngredientModal';
import MenuGrid from './MenuGrid';
import MenuSearchBar from './MenuSearchBar';

interface MenuCategoriesProps {
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const allTab: CategoryTab = {
  key: 'all',
  title: 'All',
  subtitle: 'All items across every meal category',
};

const MenuCategories: React.FC<MenuCategoriesProps> = ({ onAddToCart }) => {
  const {
    categories: menuCategories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useMenuCategories();
  const [activeCategory, setActiveCategory] = useState('all');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryId = useMemo(() => {
    if (activeCategory === 'all') {
      return 0;
    }
    return (
      menuCategories.find((category) => category.key === activeCategory)?.id ??
      0
    );
  }, [activeCategory, menuCategories]);

  const {
    items: categoryItems,
    loading: itemsLoading,
    error: itemsError,
  } = useMenuItems(categoryId);

  const categoryTabs = useMemo<CategoryTab[]>(
    () => [allTab, ...menuCategories],
    [menuCategories]
  );

  useEffect(() => {
    setQuantities((prev) => {
      const next = { ...prev };
      for (const item of categoryItems) {
        if (next[item.id] === undefined) {
          next[item.id] = 1;
        }
      }
      return next;
    });
  }, [categoryItems]);

  const filteredItems = useMenuFilter(
    categoryItems,
    searchTerm,
    vegetarianOnly
  );

  const updateQuantity = (id: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, value),
    }));
  };

  if (categoriesLoading) {
    return (
      <section className="menu-categories">
        <p className="menu-status" role="status">
          Loading menu…
        </p>
      </section>
    );
  }

  if (categoriesError) {
    return (
      <section className="menu-categories">
        <p className="menu-status menu-status-error" role="alert">
          {categoriesError}
        </p>
      </section>
    );
  }

  return (
    <section className="menu-categories">
      <MenuSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => setFiltersOpen((s) => !s)}
        isVegetarian={vegetarianOnly}
        onVegetarianChange={setVegetarianOnly}
      />
      {filtersOpen && (
        <ClickAwayListener onClickAway={() => setFiltersOpen(false)}>
          <div className="filter-inline" role="region" aria-label="Filters">
            <div className="filter-row-inline">
              <span className="filter-label">Veg-only</span>
              <Switch
                checked={vegetarianOnly}
                onChange={(e) => setVegetarianOnly(e.target.checked)}
                slotProps={{ input: { 'aria-label': 'vegetarian only' } }}
                size="medium"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    transform: 'translateX(16px)'
                  },
                  '& .MuiSwitch-track': {
                    borderRadius: 999,
                  }
                }}
              />
            </div>
          </div>
        </ClickAwayListener>
      )}
      <CategoryTabs
        tabs={categoryTabs}
        activeKey={activeCategory}
        onSelect={setActiveCategory}
      />
      {itemsLoading ? (
        <p className="menu-status" role="status">
          Loading items…
        </p>
      ) : itemsError ? (
        <p className="menu-status menu-status-error" role="alert">
          {itemsError}
        </p>
      ) : (
        <MenuGrid
          items={filteredItems}
          quantities={quantities}
          onQuantityChange={updateQuantity}
          onShowIngredients={setSelectedItem}
          onAddToCart={onAddToCart}
        />
      )}
      {selectedItem && (
        <IngredientModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
};

export default MenuCategories;
