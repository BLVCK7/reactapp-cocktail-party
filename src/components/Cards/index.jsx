import React from 'react';
import { useDispatch } from 'react-redux';
import { setTotalPrice } from '../../redux/slices/itemsSlice';

const Cards = ({ id, name, imageUrl, price, color, handlerOnAddItemToCart }) => {
  const dispatch = useDispatch();

  const onCartAddItem = () => {
    const obj = {
      id,
      name,
      imageUrl,
      price,
    };
    handlerOnAddItemToCart(obj);
    dispatch(setTotalPrice(obj.price));
  };

  return (
    <div className="cards--item">
      <div className="cards--item-header" style={{ background: color }}>
        <h1>{name}</h1>
      </div>
      <img src={imageUrl} alt={name} />
      <div className="cards--item-footer">
        <button onClick={onCartAddItem}>В корзину</button>
        <span>{price} ₽</span>
      </div>
    </div>
  );
};

export default Cards;

// (obj.id === i ? setCartItems(obj) : '')
