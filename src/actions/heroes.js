import { v4 as uuidv4 } from 'uuid';

export const getHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
};

export const deleteHero = (request, id) => (dispatch) => {
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(dispatch(heroDeleted(id)))
        .catch((err) => console.log(err));
};

export const createHero = (request, heroName, heroDescr, heroElement) => (dispatch) => {
    const newHero = {
        id: uuidv4(),
        name: heroName,
        description: heroDescr,
        element: heroElement,
    };
    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
        .then(dispatch(heroCreated(newHero)))
        .catch((err) => console.log(err));
};

export const heroesFetching = () => ({
    type: 'HEROES_FETCHING',
});

export const heroesFetched = (heroes) => ({
    type: 'HEROES_FETCHED',
    payload: heroes,
});

export const heroesFetchingError = () => ({
    type: 'HEROES_FETCHING_ERROR',
});

export const heroCreated = (hero) => ({
    type: 'HERO_CREATED',
    payload: hero,
});

export const heroDeleted = (id) => ({
    type: 'HERO_DELETED',
    payload: id,
});