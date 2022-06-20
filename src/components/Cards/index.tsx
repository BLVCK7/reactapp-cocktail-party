import React from 'react';
import { useDispatch } from 'react-redux';

import { CartItemsType, setAddItem } from '../../redux/slices/cartSlice';

type CardsProps = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  color: string;
}

const Cards: React.FC<CardsProps> = ({ id, name, imageUrl, price, color}) => {
  const dispatch = useDispatch();

  const onClickAddItem = () => {
    const item: CartItemsType = {
      id,
      name,
      price,
      imageUrl,
      count: 0
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
