import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';  
import qs from 'qs';

import { FetchItems, fetchItemsThunk, selectItems } from '../../redux/slices/itemsSlice';
import { setFilters, setCategoryId, selectFilter } from '../../redux/slices/filterSlice';

import './Catalog.scss';

import { Cards, Skeleton, Filter, Search } from '../../components';
import { sortArr } from '../../components/Filter';

import logoSVG from '../../assets/img/logo.svg';
import cartSVG from '../../assets/img/cart.svg';
import { selectCart } from '../../redux/slices/cartSlice';


const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const { activeSort, search, categoryId } = useSelector(selectFilter);
  const { items, status } = useSelector(selectItems);
  const { cartItems, totalPrice, totalCount } = useSelector(selectCart);

  const fetchItems = async () => {
    const sortBy = activeSort.sortProperty.replace('-', '');
    const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchItemsThunk({
        sortBy,
        order,
        category,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
    // eslint-disable-next-line
  }, []);

  // При первом рендере проверяются URL параметры и сохраняются в Redux
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as FetchItems;
  //     const sort = sortArr.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(setFilters({
  //       search: params.search,
  //       categoryId: Number(params.category),
  //       activeSort: sort || sortArr[0]
  //     }));
  //   }
  //   isSearch.current = true;
    // eslint-disable-next-line
  // }, []);

  // Если изменили URL параметры и был первый рендер, то отправляет на страницу с фильтрацией
  React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: activeSort.sortProperty,
  //       categoryId: categoryId,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  //   // eslint-disable-next-line
  // }, [activeSort, categoryId]);

  // // Если был первый рендер, то запрашиваем Items
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);


      fetchItems();
    
    // isSearch.current = false;
    // eslint-disable-next-line
  }, [activeSort.sortProperty, search, categoryId]);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItems)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [cartItems, totalPrice, totalCount])

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
        {status === 'rejected' ? (
          <div>
            <h2>Ошибка 404</h2>
          </div>
        ) : status === 'loading' ? (
          [...new Array(3)].map((_, i) => <Skeleton key={i} />)
        ) : (
          items.map((obj: any) => <Cards key={obj.id} {...obj} />)
        )}
      </div>
    </>
  );
};

export default Catalog;
