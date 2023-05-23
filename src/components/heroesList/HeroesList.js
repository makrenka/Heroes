import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteHero, getHeroes } from '../../actions/heroes';
import { useHttp } from '../../hooks/http.hook';
import { filteredHeroesSelector, heroesSelector } from '../../selectors';
import { HeroesListItem } from "../heroesListItem/HeroesListItem";
import { Spinner } from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

export const HeroesList = () => {
    const { heroesLoadingStatus } = useSelector(heroesSelector);
    const { request } = useHttp();
    const dispatch = useDispatch();
    const filteredHeroes = useSelector(filteredHeroesSelector);

    useEffect(() => {
        dispatch(getHeroes(request));
    }, [dispatch, request]);

    const onDelete = useCallback(
        (id) => { dispatch(deleteHero(request, id)) },
        [dispatch, request]
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