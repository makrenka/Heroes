import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { filtersReducer } from '../reducers/filters';
import { heroesReducer } from '../reducers/heroes';

const store = createStore(
  combineReducers({ heroesReducer, filtersReducer }),
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
