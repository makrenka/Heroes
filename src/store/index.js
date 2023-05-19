import { legacy_createStore as createStore, combineReducers } from 'redux';
import { filtersReducer } from '../reducers/filters';
import { heroesReducer } from '../reducers/heroes';

const store = createStore(
  combineReducers({ heroesReducer, filtersReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
