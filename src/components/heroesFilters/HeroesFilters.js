// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';

import { activeFilterChanged, getFilters } from '../../actions/filters';
import { Spinner } from '../spinner/Spinner';
import { useHttp } from '../../hooks/http.hook';
import { filtersSelector } from '../../selectors';

export const HeroesFilters = () => {

  const { filters, filtersLoadingStatus, activeFilter } = useSelector(filtersSelector);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(getFilters(request));
  }, [dispatch, request]);

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

  const elements = renderFilters(filters);

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