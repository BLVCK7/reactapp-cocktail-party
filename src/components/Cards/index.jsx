import React from 'react';
import { useDispatch } from 'react-redux';

import { setAddItem } from '../../redux/slices/cartSlice';

const Cards = ({ id, name, imageUrl, price, color }) => {
  const dispatch = useDispatch();

  const onClickAddItem = () => {
    const item = {
      id,
      name,
      price,
      imageUrl,
    };
    dispatch(setAddItem(item));
  };

  return (
    <div className="cards--item">
      <div className="cards--item-header" style={{ background: color }}>
        <h1>{name}</h1>
      </div>
      <img src={imageUrl} alt={name} />
      <div className="cards--item-footer">
        <button onClick={() => onClickAddItem()}>В корзину</button>
        <span>{price} ₽</span>
      </div>
    </div>
  );
};

export default Cards;
