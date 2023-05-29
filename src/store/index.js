import { configureStore } from '@reduxjs/toolkit';

import filters from './filtersSlice';
import heroes from './heroesSlice';

// const store = createStore(
//   combineReducers({ heroesReducer, filtersReducer }),
//   compose(
//     applyMiddleware(ReduxThunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// export default store;

export const store = configureStore({
  reducer: { heroes, filters },
  devTools: process.env.NODE_ENV !== 'production',
});
