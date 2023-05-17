export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    };
};

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    };
};

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    };
};

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter,
    };
};

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id,
    };
};