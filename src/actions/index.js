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

export const activeFilterChanged = (filter) => ({
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter,
});

export const filtersFetching = () => ({
    type: 'FILTERS_FETCHING',
});

export const filtersFetched = (data) => ({
    type: 'FILTERS_FETCHED',
    payload: data,
});

export const filtersFetchingError = () => ({
    type: 'FILTERS_FETCHING_ERROR',
});

export const heroCreated = (hero) => ({
    type: 'HERO_CREATED',
    payload: hero,
});

export const heroDeleted = (id) => ({
    type: 'HERO_DELETED',
    payload: id,
});