import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';

interface MenuSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick?: () => void;
  isVegetarian: boolean;
  onVegetarianChange: (value: boolean) => void;
}

const MenuSearchBar: React.FC<MenuSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick: onFilterClickProp,
  isVegetarian,
  onVegetarianChange,
}) => {
  const handleFilterToggle = () => {
    if (onFilterClickProp) onFilterClickProp();
  };
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

            {isVegetarian && (
              <div className="veg-badge" aria-hidden>
                veg
              </div>
            )}
          </div>
        </span>
      </div>
    </div>
  );
};

export default MenuSearchBar;
