import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter, setActiveSort } from '../../redux/slices/filterSlice';

const Filter = () => {
  const [animateSortIcon, setAnimateSortIcon] = React.useState(false);
  const [visiblePopUp, setVisiblePopUp] = React.useState(false);

  const sortList = () => {
    setVisiblePopUp(!visiblePopUp);
    setAnimateSortIcon(!animateSortIcon);
  };

  const filterArr = ['Все', 'Хит', 'Десертные', 'Фруктовые', 'Без сахара'];
  const sortArr = [
    { name: 'популярности (по возр.)', type: 'rating', order: 'asc' },
    { name: 'популярности (по убыв.)', type: 'rating', order: 'desc' },
    { name: 'цене (по возр.)', type: 'price', order: 'asc' },
    { name: 'цене (по убыв.)', type: 'price', order: 'desc' },
    { name: 'алфавиту (А - Я)', type: 'name', order: 'asc' },
    { name: 'алфавиту (Я - А)', type: 'name', order: 'desc' },
  ];

  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.filter.activeFilter);
  const activeSort = useSelector((state) => state.filter.activeSort);

  console.log(activeFilter, activeSort);

  return (
    <div className="filter">
      <h1>Фильтр</h1>
      {filterArr.map((obj, i) => (
        <button
          key={i}
          className={i === activeFilter ? 'active' : ''}
          onClick={() => dispatch(setActiveFilter(i))}>
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
                  onClick={() => dispatch(setActiveSort(obj))}
                  key={i}
                  className={activeSort.name === i ? 'active' : ''}>
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p>{activeSort.name}</p>
      </div>
    </div>
  );
};

export default Filter;
