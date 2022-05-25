import React from 'react';

const Cards = ({ name, image, price, color, id }) => {
  return (
    <div className="cards--item">
      <div key={id} className="cards--item-header-red" style={{ background: { color } }}>
        <h1>{name}</h1>
      </div>
      <img src={image} alt={name} />
      <div className="cards--item-footer">
        <button>В корзину</button>
        <span>{price} ₽</span>
      </div>
    </div>
  );
};

export default Cards;
