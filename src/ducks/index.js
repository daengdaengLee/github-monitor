import {
  combineReducers,
  createStore as _createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import users from './modules/users';
import repos from './modules/repos';
import rootSaga from './sagas';

export const history = createBrowserHistory();

const rootReducer = combineReducers({ users, repos });

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStore = initState => {
  const store = _createStore(
    connectRouter(history)(rootReducer),
    initState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStore();
