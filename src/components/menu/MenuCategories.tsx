import React, { useEffect, useMemo, useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
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
  const [maxCalories, setMaxCalories] = useState<number | null>(null);
  const [maxFat, setMaxFat] = useState<number | null>(null);
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
    vegetarianOnly,
    maxCalories,
    maxFat
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
        maxCalories={maxCalories}
        maxFat={maxFat}
      />
      {filtersOpen && (
        <ClickAwayListener
          onClickAway={(event) => {
            const target = (event as any)?.target as HTMLElement | null;
            if (target && target.closest('.filter-button')) return;
            setFiltersOpen(false);
          }}
        >
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
            <div className="filter-row-inline">
              <span className="filter-label">Calories</span>
              <div className="filter-slider-container">
                <Slider
                  value={maxCalories || 1000}
                  onChange={(e, value) => setMaxCalories(value as number)}
                  min={100}
                  max={1000}
                  step={50}
                  valueLabelDisplay="auto"
                  className="filter-slider"
                  sx={{
                    width: '140px',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#34c759',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#34c759',
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: '#e5e7eb',
                    }
                  }}
                  aria-label="Max calories"
                />
                <button
                  className="filter-clear-btn"
                  onClick={() => setMaxCalories(null)}
                  title="Clear calories filter"
                  aria-label="Clear calories filter"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="filter-row-inline">
              <span className="filter-label">Fat</span>
              <div className="filter-slider-container">
                <Slider
                  value={maxFat || 100}
                  onChange={(e, value) => setMaxFat(value as number)}
                  min={5}
                  max={100}
                  step={5}
                  valueLabelDisplay="auto"
                  className="filter-slider"
                  sx={{
                    width: '140px',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#f59e0b',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#f59e0b',
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: '#e5e7eb',
                    }
                  }}
                  aria-label="Max fat (g)"
                />
                <button
                  className="filter-clear-btn"
                  onClick={() => setMaxFat(null)}
                  title="Clear fat filter"
                  aria-label="Clear fat filter"
                >
                  ✕
                </button>
              </div>
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
