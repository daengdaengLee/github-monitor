import { all, takeEvery } from 'redux-saga/effects';
import { PUSH_USER } from '../modules/users';

// Workers
function* pushUserSaga({ username }) {
  yield console.log('saga', username);
}

// Watchers
function* watchPushUser() {
  yield takeEvery(PUSH_USER, pushUserSaga);
}

export default function* usersSaga() {
  yield all([watchPushUser()]);
}
