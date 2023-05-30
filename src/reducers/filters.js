import { createReducer } from "@reduxjs/toolkit";

import { activeFilterChanged, filtersFetched, filtersFetching } from "../actions/filters";

const initialState = {
    filters: [], //heroes.json
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
};

// export const filtersReducer = (state = initialState, action) => {
//     switch (action.type) {

//         case 'FILTERS_FETCHING':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'loading',
//             };

//         case 'FILTERS_FETCHED':
//             return {
//                 ...state,
//                 filters: action.payload,
//                 filtersLoadingStatus: 'idle',
//             };

//         case 'ACTIVE_FILTER_CHANGED':
//             return {
//                 ...state,
//                 activeFilter: action.payload,
//             };

//         default:
//             return state;
//     }
// };

export const filtersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(filtersFetching, (state) => {
            state.filtersLoadingStatus = 'loading';
        })
        .addCase(filtersFetched, (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
        })
        .addCase(filtersFetchingError, (state) => {
            state.filtersLoadingStatus = 'error';
        })
        .addCase(activeFilterChanged, (state, action) => {
            state.activeFilter = action.payload;
        })
        .addDefaultCase(() => { });
});

// export const filtersReducer = createReducer(initialState,
//     {
//         [filtersFetching]: (state) => {
//             state.filtersLoadingStatus = 'loading';
//         },
//         [filtersFetched]: (state, action) => {
//             state.filtersLoadingStatus = 'idle';
//             state.filters = action.payload;
//         },
//         [activeFilterChanged]: (state, action) => {
//             state.activeFilter = action.payload;
//         },
//     },
//     [],
//     (state) => state
// );