import { useDispatch } from "react-redux";
import { filtersFetched, filtersFetching, filtersFetchingError, heroCreated, heroDeleted, heroesFetched, heroesFetching, heroesFetchingError } from "../actions";
import { useHttp } from "../hooks/http.hook"

export const useHeroesService = () => {
    const { request } = useHttp();
    const dispatch = useDispatch();

    const getHeroes = () => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));
    };

    const deleteHero = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(heroDeleted(id)))
            .catch((err) => console.log(err));
    };

    const createHero = (newHero) => {
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(dispatch(heroCreated(newHero)))
            .catch((err) => console.log(err));
    };

    const getFilters = () => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then((data) => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()));
    }

    return {
        getHeroes,
        deleteHero,
        createHero,
        getFilters,
    };
};