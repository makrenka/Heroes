// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';

import { Spinner } from '../spinner/Spinner';
import { allFiltersSelector, filtersSelector } from '../../selectors';
import { activeFilterChanged, getFilters } from '../../store/filtersSlice';

export const HeroesFilters = () => {

  const { filtersLoadingStatus, activeFilter } = useSelector(filtersSelector);
  const dispatch = useDispatch();
  const allFilters = useSelector(allFiltersSelector);

  useEffect(() => {
    dispatch(getFilters());
  }, [dispatch]);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
  };

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Фильтры не найдены</h5>
    };

    return arr.map(({ name, label, className }) => {
      const btnClass = classNames('btn', className, {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(allFilters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {elements}
        </div>
      </div>
    </div>
  );
};