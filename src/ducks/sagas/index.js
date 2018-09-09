import { all } from 'redux-saga/effects';
import usersSaga from './users';
import reposSaga from './repos';
import commitsSaga from './commits';

export default function* rootSaga() {
  yield all([usersSaga(), reposSaga(), commitsSaga()]);
}
