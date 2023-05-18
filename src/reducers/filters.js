const initialState = {
    filters: [], //heroes.json
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
};

export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading',
            };

        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle',
            };

        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
            };

        default:
            return state;
    }
};