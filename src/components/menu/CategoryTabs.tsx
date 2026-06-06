import React from 'react';

export interface CategoryTab {
  key: string;
  title: string;
  subtitle: string;
}

interface CategoryTabsProps {
  tabs: CategoryTab[];
  activeKey: string;
  onSelect: (key: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  tabs,
  activeKey,
  onSelect,
}) => (
  <div className="category-tabs">
    {tabs.map((category) => (
      <button
        key={category.key}
        type="button"
        className={`category-button ${
          category.key === activeKey ? 'active' : ''
        }`}
        onClick={() => onSelect(category.key)}
      >
        {category.title}
      </button>
    ))}
  </div>
);

export default CategoryTabs;
