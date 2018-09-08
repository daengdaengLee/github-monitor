import { all } from 'redux-saga/effects';
import usersSaga from './users';
import reposSaga from './repos';

export default function* rootSaga() {
  yield all([usersSaga(), reposSaga()]);
}
