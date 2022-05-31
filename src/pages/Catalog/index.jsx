import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Catalog.scss';

import { Cards, Skeleton, Filter, Search } from '../../components';

import logoSVG from '../../assets/img/logo.svg';
import cartSVG from '../../assets/img/cart.svg';

const Catalog = () => {
  const { activeFilter, activeSort } = useSelector((state) => state.filter);

  const [item, setItem] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://628f8bb5dc47852365428e7e.mockapi.io/items?${
          search === '' ? '' : `search=${search}&`
        }${activeFilter > 0 ? `category=${activeFilter}` : ''}&sortBy=${activeSort.type}&order=${
          activeSort.order
        }`,
      )
      .then((response) => {
        setItem(response.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeSort, activeFilter, search]);

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
        <Search search={search} setSearch={setSearch} />
        <Link to="/cart">
          <div className="cart">
            <img src={cartSVG} alt="Cart icon" />
            <p>3 500 ₽</p>
          </div>
        </Link>
      </header>
      <Filter />
      <div className="cards">
        {isLoading
          ? [...new Array(3)].map((_, i) => <Skeleton key={i} />)
          : item.map((obj) => <Cards key={obj.id} {...obj} />)}
      </div>
    </>
  );
};

export default Catalog;
