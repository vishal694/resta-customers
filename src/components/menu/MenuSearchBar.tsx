import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';

interface MenuSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick?: () => void;
  isVegetarian: boolean;
  onVegetarianChange: (value: boolean) => void;
  maxCalories?: number | null;
  maxFat?: number | null;
}

const MenuSearchBar: React.FC<MenuSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick: onFilterClickProp,
  isVegetarian,
  onVegetarianChange,
  maxCalories,
  maxFat,
}) => {
  const handleFilterToggle = () => {
    if (onFilterClickProp) onFilterClickProp();
  };

  const hasActiveFilters = isVegetarian || maxCalories !== null || maxFat !== null;

  return (
    <div className="search-panel menu-search-panel">
      <div className="search-field">
        <input
          className="search-input"
          type="search"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search menu items"
        />
        <span className="search-switch">
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="filter-button"
              aria-label="Open filters"
              onClick={handleFilterToggle}
            >
              <FilterListIcon className="filter-icon" />
            </button>

            {hasActiveFilters && (
              <div className="filter-badges">
                {isVegetarian && (
                  <div className="veg-badge" aria-hidden>
                    veg
                  </div>
                )}
                {maxCalories !== null && (
                  <div className="filter-badge calories-badge" aria-hidden>
                    ≤{maxCalories}cal
                  </div>
                )}
                {maxFat !== null && (
                  <div className="filter-badge fat-badge" aria-hidden>
                    ≤{maxFat}g fat
                  </div>
                )}
              </div>
            )}
          </div>
        </span>
      </div>
    </div>
  );
};

export default MenuSearchBar;
