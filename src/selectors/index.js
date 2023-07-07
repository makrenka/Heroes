import { createSelector } from '@reduxjs/toolkit';

import { heroesAdapter } from '../store/heroesSlice';
import { store } from '../store';
import { filtersAdapter } from '../store/filtersSlice';

export const filtersSelector = (state) => state.filters;

export const heroesSelector = (state) => state.heroes;

const allHeroes = heroesAdapter.getSelectors((state) => state.heroes).selectAll;

export const allFiltersSelector = () => (
    filtersAdapter.getSelectors((state) => state.filters).selectAll(store.getState())
);

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    // (state) => state.heroes.heroes,
    allHeroes,
    // allFilters,
    (filters, heroes) => {
        if (filters === 'all') {
            return heroes;
        } else {
            return heroes.filter((item) => item.element === filters);
        };
    }
);

