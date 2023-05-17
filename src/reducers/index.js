const initialState = {
  heroes: [], //heroes.json
  heroesLoadingStatus: 'idle', //ничего не происходит
  filters: [], //heroes.json
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
  filteredHerous: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        filteredHerous:
          state.activeFilter === 'all'
            ? action.payload
            : action.payload.filter(
              (item) => item.element === state.activeFilter
            ),
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case 'HERO_DELETED':
      const newHeroList = state.heroes.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        heroes: newHeroList,
        filteredHerous:
          state.activeFilter === 'all'
            ? newHeroList
            : newHeroList.filter((item) => item.element === state.activeFilter),
      };
    default:
      return state;
  }
};

export default reducer;
