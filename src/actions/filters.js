import { createAction } from "@reduxjs/toolkit";

export const getFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
        .then((data) => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
};

// export const activeFilterChanged = (filter) => ({
//     type: 'ACTIVE_FILTER_CHANGED',
//     payload: filter,
// });

export const activeFilterChanged = createAction('ACTIVE_FILTER_CHANGED');

// export const filtersFetching = () => ({
//     type: 'FILTERS_FETCHING',
// });

export const filtersFetching = createAction('FILTERS_FETCHING');

// export const filtersFetched = (data) => ({
//     type: 'FILTERS_FETCHED',
//     payload: data,
// });

export const filtersFetched = createAction('FILTERS_FETCHED');

// export const filtersFetchingError = () => ({
//     type: 'FILTERS_FETCHING_ERROR',
// });

export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');
