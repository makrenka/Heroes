import { configureStore } from '@reduxjs/toolkit';

import { filtersReducer } from '../reducers/filters';
import { heroesReducer } from '../reducers/heroes';

// const store = createStore(
//   combineReducers({ heroesReducer, filtersReducer }),
//   compose(
//     applyMiddleware(ReduxThunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// export default store;

export const store = configureStore({
  reducer: { heroesReducer, filtersReducer },
  devTools: process.env.NODE_ENV !== 'production',
});
