import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(sagaMiddleware)
);

store.subscribe(() => {
  console.log("new state", store.getState());
});

sagaMiddleware.run(rootSaga);

export default store;

