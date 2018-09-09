import { all, takeEvery, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { PUSH_USER } from '../modules/users';
import { fetchStart } from '../modules/repos';

// Workers
function* pushUserSaga({ username }) {
  const { repos } = yield select(state => state.repos);
  yield put(
    !repos[username] ? fetchStart({ username }) : push(`/repos/${username}`),
  );
}

// Watchers
function* watchPushUser() {
  yield takeEvery(PUSH_USER, pushUserSaga);
}

export default function* usersSaga() {
  yield all([watchPushUser()]);
}
