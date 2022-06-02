import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import searchSVG from '../../assets/img/search.svg';
import cancelSVG from '../../assets/img/cancel.svg';

import { setSearch } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearch(''));
    setValue('');
    inputRef.current.focus();
  };

  // eslint-disable-next-line
  const testDebounce = React.useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 700),
    [],
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    testDebounce(e.target.value);
  };

  return (
    <div className="search">
      <img className="search-icon" src={searchSVG} alt="search" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder="Название милкшейка..."
        autoComplete="off"
      />
      {value && (
        <img onClick={() => onClickClear()} className="cancel-icon" src={cancelSVG} alt="cancel" />
      )}
    </div>
  );
};

export default Search;
