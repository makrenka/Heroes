import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { useHttp } from '../hooks/http.hook';

export const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
});

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// };

export const getHeroes = createAsyncThunk('heroes/getHeroes', async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/heroes");
});

export const deleteHero = createAsyncThunk('heroes/deleteHero', async (id, { dispatch }) => {
    const { request } = useHttp();
    await request(`http://localhost:3001/heroes/${id}`, 'DELETE');
    dispatch(heroDeleted(id));
});

export const createHero = createAsyncThunk('heroes/createHero', async (
    newHero, { dispatch }
) => {
    const { request } = useHttp();
    await request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero));
    dispatch(heroCreated(newHero));
});

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroCreated: (state, action) => {
            // state.heroes.push(action.payload);
            heroesAdapter.addOne(state, action.payload);
        },
        heroDeleted: (state, action) => {
            // state.heroes = state.heroes.filter((item) => item.id !== action.payload);
            heroesAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHeroes.pending, (state) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(getHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(getHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addCase(deleteHero.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addCase(createHero.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => { });
    },
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;