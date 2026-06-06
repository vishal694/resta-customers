import React from 'react';
import { useItemIngredients } from '../../hooks/useItemIngredients';
import { MenuItem } from '../../types/menu';

interface IngredientModalProps {
  item: MenuItem;
  onClose: () => void;
}

const IngredientModal: React.FC<IngredientModalProps> = ({ item, onClose }) => {
  const { ingredients, loading, error } = useItemIngredients(item.id);

  return (
  <div
    className="ingredient-modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="ingredient-modal-title"
    onClick={onClose}
  >
    <div className="ingredient-modal" onClick={(event) => event.stopPropagation()}>
      <div className="ingredient-modal-header">
        <div>
          <h4 id="ingredient-modal-title">{item.name}</h4>
          <p className="ingredient-modal-subtitle">{item.description}</p>
        </div>
        <button
          type="button"
          className="ingredient-modal-close"
          onClick={onClose}
          aria-label="Close ingredient details"
        >
          ×
        </button>
      </div>
      <img
        className="ingredient-modal-image"
        src={item.image}
        alt={item.name}
      />
      <div className="ingredient-modal-body">
        <div className="nutrition-row">
          <span>{item.calories} kcal</span>
          <span>{item.totalFat} total fat</span>
        </div>
        <div className="ingredient-list">
          <strong>Ingredients</strong>
          {loading ? (
            <p className="ingredient-unavailable" role="status">
              Loading ingredients…
            </p>
          ) : error ? (
            <p className="ingredient-unavailable menu-status-error" role="alert">
              {error}
            </p>
          ) : ingredients.length > 0 ? (
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={`${ingredient.name}-${index}`}>
                  <span>{ingredient.name}</span>
                  <span className="ingredient-quantity">
                    {ingredient.quantity}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="ingredient-unavailable">
              Ingredient details are not available for this item.
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default IngredientModal;
