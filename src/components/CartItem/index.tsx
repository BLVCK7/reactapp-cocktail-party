import React from 'react';
import { useDispatch } from 'react-redux';
import { CartItemsType, setAddItem, setMinusItem, setRemoveItem } from '../../redux/slices/cartSlice';

type ItemProps = {
  id: string;
  img: string;
  name: string;
  price: number;
  count: number;
}

const Item: React.FC<ItemProps> = ({ id, img, name, price, count }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      setAddItem({
        id,
      } as CartItemsType),
    );
  };

  const onClickMinus = () => {
    if (count >= 2) {
      dispatch(setMinusItem(id));
    }
  };

  const onClickRemove = () => {
    if (window.confirm('Действительно хочешь удалить?')) {
      dispatch(setRemoveItem(id));
    }
  };

  return (
    <div className="item">
      <img src={img} alt="strawberry" />
      <h1>{name}</h1>
      <div className="counter">
        <svg
        className={count === 1 ? 'disabled' : ''}
          onClick={onClickMinus}
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="17.5" cy="17.5" r="16.5" stroke="white" strokeWidth="2" />
          <line x1="12" y1="18" x2="24" y2="18" stroke="white" strokeWidth="2" />
        </svg>
        <span>{count}</span>
        <svg
          onClick={onClickPlus}
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="17.5" cy="17.5" r="16.5" stroke="white" strokeWidth="2" />
          <line x1="12" y1="18" x2="24" y2="18" stroke="white" strokeWidth="2" />
          <line x1="18" y1="24" x2="18" y2="12" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <div className="price">
        <span>{price} ₽</span>
      </div>
      <div className="cancel">
        {' '}
        <svg
          onClick={onClickRemove}
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="17.5" cy="17.5" r="16.5" stroke="white" strokeWidth="2" />
          <line
            x1="13.7704"
            y1="13.7956"
            x2="22.3043"
            y2="22.2319"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="13.8191"
            y1="22.2807"
            x2="22.2555"
            y2="13.7468"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default Item;
