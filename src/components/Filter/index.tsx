import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setActiveSort, SortPropertyEnum } from '../../redux/slices/filterSlice';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'

type sortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}

type FilterProps = {
  onChangeCategory: (i: number) => void;
}

export const sortArr: sortItem[] = [
  { name: 'популярности (по возр.)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'популярности (по убыв.)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'цене (по возр.)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'цене (по убыв.)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'алфавиту (А - Я)', sortProperty: SortPropertyEnum.NAME_ASC },
  { name: 'алфавиту (Я - А)', sortProperty: SortPropertyEnum.NAME_DESC },
];

export const filterArr = ['Все', 'Хит', 'Десертные', 'Фруктовые', 'Без сахара'];

const Filter: React.FC<FilterProps> = React.memo(({ onChangeCategory }) => {
  // useWhyDidYouUpdate('Filter', {onChangeCategory})
  const dispatch = useDispatch();

  const { activeSort, categoryId } = useSelector(selectFilter);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [animateSortIcon, setAnimateSortIcon] = React.useState(false);
  const [visiblePopUp, setVisiblePopUp] = React.useState(false);

  const sortList = () => {
    setVisiblePopUp(!visiblePopUp);
    setAnimateSortIcon(!animateSortIcon);
  };

  const onClickSortItem = (obj: sortItem) => {
    dispatch(setActiveSort(obj))
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setVisiblePopUp(false);
        setAnimateSortIcon(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.addEventListener('click', handleClickOutside);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="filter">
      <h1>Фильтр</h1>
      {filterArr.map((obj, i) => (
        <button
          key={i}
          className={i === categoryId ? 'active' : ''}
          onClick={() => onChangeCategory(i)}>
          {obj}
        </button>
      ))}
      <div ref={sortRef} onClick={sortList} className="sort-popup">
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
                  onClick={() => onClickSortItem(obj)}
                  key={i}
                  className={activeSort.sortProperty === obj.sortProperty ? 'active' : ''}>
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
})

export default Filter;
