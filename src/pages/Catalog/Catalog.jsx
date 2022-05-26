import React from 'react';
import { Link } from 'react-router-dom';

import './Catalog.scss';

import Cards from '../../components/Cards';

import logoSVG from '../../assets/img/logo.svg';
import cartSVG from '../../assets/img/cart.svg';
import Skeleton from '../../components/Cards/Skeleton';

const Catalog = () => {
  const filterArr = ['Все', 'Хит', 'Десертные', 'Фруктовые', 'Без сахара'];
  const sortArr = [
    'популярности (DESC)',
    'популярности (ASC)',
    'цене (DESC)',
    'цене (ASC)',
    'алфавиту (А - Я)',
    'алфавиту (Я - А)',
  ];

  const [activeFilter, setActiveFilter] = React.useState(0);
  const [activeSort, setActiveSort] = React.useState(0);
  const [animateSortIcon, setAnimateSortIcon] = React.useState(false);
  const [visiblePopUp, setVisiblePopUp] = React.useState(false);
  const [item, setItem] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const sortList = () => {
    setVisiblePopUp(!visiblePopUp);
    setAnimateSortIcon(!animateSortIcon);
  };

  React.useEffect(() => {
    fetch('https://628f8bb5dc47852365428e7e.mockapi.io/items')
      .then((response) => response.json())
      .then((arr) => {
        setItem(arr);
        setIsLoading(false);
      });
  }, []);

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
        <div className="search">
          <input type="search" placeholder="Название милкшейка..." autoComplete="off" />
        </div>
        <Link to="/cart">
          <div className="cart">
            <img src={cartSVG} alt="Cart icon" />
            <p>3 500 ₽</p>
          </div>
        </Link>
      </header>
      <div className="sort">
        <h1>Фильтр</h1>
        {filterArr.map((obj, i) => (
          <button
            key={i}
            className={i === activeFilter ? 'active' : ''}
            onClick={() => setActiveFilter(i)}>
            {obj}
          </button>
        ))}
        <div onClick={sortList} className="sort-popup">
          <div className={animateSortIcon === true ? 'sort-icon-in' : 'sort-icon-out'}>
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_5_302)">
                <path
                  d="M18.1532 22.6557C17.5766 22.1486 16.6387 22.225 16.1315 22.8016L10.782 28.832V4.73132C10.782 3.93931 10.1289 3.28625 9.33692 3.28625C8.54492 3.28625 7.89186 3.93931 7.89186 4.73132V28.832L2.54233 22.8016C1.96569 22.225 1.09726 22.1486 0.520625 22.6557C-0.0560127 23.2323 -0.132434 24.1008 0.374729 24.6774L8.25312 33.4937C8.84366 34.2232 9.88577 34.112 10.3513 33.4937L18.2991 24.6774C18.8063 24.1077 18.7368 23.1629 18.1532 22.6557Z"
                  fill="white"
                />
                <path
                  d="M33.6252 9.35831L25.8162 0.542013C25.1215 -0.159678 24.2531 -0.201363 23.6486 0.542013L15.7008 9.35831C15.1936 9.93495 15.27 10.8729 15.8467 11.38C16.7359 12.0887 17.6322 11.6023 17.8684 11.2341L23.2179 5.20374V29.2349C23.2179 30.0269 23.871 30.68 24.663 30.68C25.455 30.68 26.108 30.1034 26.108 29.3044V5.21069L31.4576 11.2411C32.0342 11.8177 32.9026 11.8941 33.4793 11.387C34.0559 10.8034 34.1323 9.93495 33.6252 9.35831Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_5_302">
                  <rect width="34" height="34" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {visiblePopUp && (
            <div className="sort-popup-list">
              <ul>
                {sortArr.map((obj, i) => (
                  <li
                    onClick={() => setActiveSort(i)}
                    key={i}
                    className={activeSort === i ? 'active' : ''}>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p>{sortArr[activeSort]}</p>
        </div>
      </div>
      <div className="cards">
        {isLoading
          ? [...new Array(3)].map((_, i) => <Skeleton key={i} />)
          : item.map((obj) => <Cards key={obj.id} {...obj} />)}
      </div>
      <div className="paginations">
        <svg
          width="14"
          height="24"
          viewBox="0 0 14 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M13 1L2 12L13 23" stroke="white" strokeWidth="2" />
        </svg>
        <i>
          <span>1</span>
        </i>
        <i className="active">
          <span className="active">2</span>
        </i>
        <i>
          <span>3</span>
        </i>
        <svg
          width="14"
          height="24"
          viewBox="0 0 14 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L12 12L1 23" stroke="white" strokeWidth="2" />
        </svg>
      </div>
    </>
  );
};

export default Catalog;
