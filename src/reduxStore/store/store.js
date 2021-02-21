import { combineReducers, createStore,applyMiddleware } from 'redux';
import reducers from '../reducers/reducer'
import thunk from 'redux-thunk';

export const store = createStore(combineReducers({ TrlState: reducers }),applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENTION__ && window.__REDUX_DEVTOOLS_EXTENTION__())
