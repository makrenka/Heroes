import { createReducer } from "@reduxjs/toolkit";
import { heroCreated, heroDeleted, heroesFetched, heroesFetching, heroesFetchingError } from "../actions/heroes";

const initialState = {
    heroes: [], //heroes.json
    heroesLoadingStatus: 'idle', //ничего не происходит
};

// export const heroesReducer = (state = initialState, action) => {
//     switch (action.type) {

//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading',
//             };

//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle',
//             };

//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error',
//             };

//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//             };

//         case 'HERO_DELETED':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter((item) => item.id !== action.payload),
//             };

//         default:
//             return state;
//     }
// };

export const heroesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(heroesFetching, (state) => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, (state) => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter((item) => item.id !== action.payload);
        })
        .addDefaultCase(() => { });
});

// export const heroesReducer = createReducer(initialState,
//     {
//         [heroesFetching]: (state) => {
//             state.heroesLoadingStatus = 'loading';
//         },
//         [heroesFetched]: (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         },
//         [heroesFetchingError]: (state) => {
//             state.heroesLoadingStatus = 'error';
//         },
//         [heroCreated]: (state, action) => {
//             state.heroes.push(action.payload);
//         },
//         [heroDeleted]: (state, action) => {
//             state.heroes = state.heroes.filter((item) => item.id !== action.payload);
//         }
//     },
//     [],
//     (state) => state
// );