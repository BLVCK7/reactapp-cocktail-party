import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setLoading, setItems, addItemToCart } from '../../redux/slices/itemsSlice';
// import { itemsApi } from '../../redux/services/itemsService';

import './Catalog.scss';

import { Cards, Skeleton, Filter, Search } from '../../components';

import logoSVG from '../../assets/img/logo.svg';
import cartSVG from '../../assets/img/cart.svg';

const Catalog = () => {
  const dispatch = useDispatch();

  const { activeFilter, activeSort, search } = useSelector((state) => state.filter);
  const { items, isLoading, totalPrice } = useSelector((state) => state.items);

  // const { data, error, isLoading } = itemsApi.useFetchItemsQuery(activeSort, activeFilter);

  React.useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get(
        `https://628f8bb5dc47852365428e7e.mockapi.io/items?${
          search === '' ? '' : `search=${search}&`
        }${activeFilter > 0 ? `category=${activeFilter}` : ''}&sortBy=${activeSort.type}&order=${
          activeSort.order
        }`,
      )
      .then((response) => {
        dispatch(setItems(response.data));
        dispatch(setLoading(false));
      });
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [activeSort, activeFilter, search]);

  const handlerOnAddItemToCart = (obj) => {
    dispatch(addItemToCart(obj));
  };

  return (
    <>
      <header>
        <Link to="/">
          <div className="logo">
            <img src={logoSVG} alt="Cocktail Party Logo" />
            <div className="logo--info">
              <h2>Cocktail Party</h2>
              <p>Ням-Ням</p>
            </div>
          </div>
        </Link>
        <Search />
        <Link to="/cart">
          <div className="cart">
            <img src={cartSVG} alt="Cart icon" />
            <p>{totalPrice} ₽</p>
          </div>
        </Link>
      </header>
      <Filter />
      <div className="cards">
        {isLoading
          ? [...new Array(3)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => (
              <Cards key={obj.id} handlerOnAddItemToCart={handlerOnAddItemToCart} {...obj} />
            ))}
      </div>
    </>
  );
};

export default Catalog;
