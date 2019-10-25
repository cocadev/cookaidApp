import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import getRootReducer from './reducers/rootReducer';
import {composeWithDevTools} from "redux-devtools-extension";

let store;

export function getStore() {
  store = createStore(
    getRootReducer(),
    composeWithDevTools(
      applyMiddleware(thunk)
    ),
  );
  return store;
}

export default store;
