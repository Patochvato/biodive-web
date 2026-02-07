import React from 'react';
import '../cartes.css';

const CarteChoixOptions = ({
  options,
  onChoix,
  onToggle,
  getOptionKey,
  selectedKeys,
  className = ''
}) => {
  const optionKey = getOptionKey || ((optionTexte) => optionTexte.trim().charAt(0));
  const selected = selectedKeys || [];

  return (
    <div className={`carte-choix-list ${className}`.trim()}>
      {options.map((optionTexte, index) => {
        const key = optionKey(optionTexte);
        const isSelected = selected.includes(key);

        return (
          <button
            key={`${key}-${index}`}
            className={`carte-btn carte-btn-choix ${isSelected ? 'is-selected' : ''}`.trim()}
            onClick={() => (onToggle ? onToggle(key, optionTexte) : onChoix(optionTexte))}
          >
            {optionTexte}
          </button>
        );
      })}
    </div>
  );
};

export default CarteChoixOptions;
