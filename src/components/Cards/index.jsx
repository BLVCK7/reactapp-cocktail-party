import React from 'react';

const Cards = ({ name, imageUrl, price, color }) => {
  return (
    <div className="cards--item">
      <div className="cards--item-header" style={{ background: color }}>
        <h1>{name}</h1>
      </div>
      <img src={imageUrl} alt={name} />
      <div className="cards--item-footer">
        <button>В корзину</button>
        <span>{price} ₽</span>
      </div>
    </div>
  );
};

export default Cards;
