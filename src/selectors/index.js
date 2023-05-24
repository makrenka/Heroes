import { createSelector } from 'reselect';

export const filtersSelector = (state) => state.filtersReducer;

export const heroesSelector = (state) => state.heroesReducer;

export const filteredHeroesSelector = createSelector(
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