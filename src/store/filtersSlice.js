import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { store } from ".";

import { useHttp } from "../hooks/http.hook";

export const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
});

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all',
// };

export const getFilters = createAsyncThunk('filters/getFilters', async () => {
    const { request } = useHttp();
    return await request('http://localhost:3001/filters');
});

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFilters.pending, (state) => {
                state.filtersLoadingStatus = 'loading';
            })
            .addCase(getFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                // state.filters = action.payload;
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(getFilters.rejected, (state) => {
                state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(() => { });
    },
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;