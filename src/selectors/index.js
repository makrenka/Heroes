import { createSelector } from '@reduxjs/toolkit';

export const filtersSelector = (state) => state.filters;

export const heroesSelector = (state) => state.heroes;

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter((item) => item.element === filter);
        };
    }
);