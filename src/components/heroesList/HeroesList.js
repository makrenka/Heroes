import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { useHttp } from '../../hooks/http.hook';
import { HeroesListItem } from "../heroesListItem/HeroesListItem";
import { Spinner } from '../spinner/Spinner';
import { useHeroesService } from '../../services/HeroesService';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

export const HeroesList = () => {
    const { heroesLoadingStatus } = useSelector(state => state);
    const { request } = useHttp();
    const { getHeroes, deleteHero } = useHeroesService();

    const filteredHeroesSelector = createSelector(
        (state) => state.filtersReducer.activeFilter,
        (state) => state.heroesReducer.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes;
            } else {
                return heroes.filter((item) => item.element === filter);
            };
        }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);

    useEffect(() => {
        getHeroes();
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback(
        (id) => { deleteHero(id) },
        // eslint-disable-next-line
        [request]
    );

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
};