import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setLoading, setItems } from '../../redux/slices/itemsSlice';
import { setFilters, setCategoryId } from '../../redux/slices/filterSlice';
// import { itemsApi } from '../../redux/services/itemsService';

import './Catalog.scss';

import { Cards, Skeleton, Filter, Search } from '../../components';

import logoSVG from '../../assets/img/logo.svg';
import cartSVG from '../../assets/img/cart.svg';
import { sortArr } from '../../components/Filter';

const Catalog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { activeFilter, activeSort, search, categoryId } = useSelector((state) => state.filter);
  const { items, isLoading } = useSelector((state) => state.items);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  // const { items, totalPrice } = useSelector((state) => state.cart);

  const onChangeCategory = React.useCallback((idx) => {
    dispatch(setCategoryId(idx));
    // eslint-disable-next-line
  }, []);

  const fetchItems = () => {
    dispatch(setLoading(true));
    const sortBy = activeSort.sortProperty.replace('-', '');
    const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    axios
      .get(
        `https://628f8bb5dc47852365428e7e.mockapi.io/items?${
          search === '' ? '' : `search=${search}&`
        }${category}&sortBy=${sortBy}&order=${order}`,
      )
      .then((response) => {
        dispatch(setItems(response.data));
        dispatch(setLoading(false));
      });
  };

  // При первом рендере проверяются URL параметры и сохраняются в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortArr.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // Если изменили URL параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: activeSort.sortProperty,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [activeSort, activeFilter, categoryId]);

  // Если был первый рендер, то запрашиваем Items
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchItems();
    }
    isSearch.current = false;
    // eslint-disable-next-line
  }, [activeSort, activeFilter, search, categoryId]);

  // const { data, error, isLoading } = itemsApi.useFetchItemsQuery(activeSort, activeFilter);

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
        {cartItems.length === 0 ? (
          <Link to="/empty_cart">
            <div className="cart">
              <img src={cartSVG} alt="Cart icon" />
              <p>{totalPrice} ₽</p>
            </div>
          </Link>
        ) : (
          <Link to="/cart">
            <div className="cart">
              <img src={cartSVG} alt="Cart icon" />
              <p>{totalPrice} ₽</p>
            </div>
          </Link>
        )}
      </header>
      <Filter onChangeCategory={onChangeCategory} />
      <div className="cards">
        {isLoading
          ? [...new Array(3)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <Cards key={obj.id} {...obj} />)}
      </div>
    </>
  );
};

export default Catalog;
