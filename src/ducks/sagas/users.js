import { all, takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { PUSH_USER } from '../modules/users';
import { pushRepos, fetchSuccess, fetchFail } from '../modules/repos';
import { listRepos } from '../../assets/js/requests';

// Workers
function* pushUserSaga({ username }) {
  try {
    const {
      data,
      headers: { link },
    } = yield call(listRepos, username);
    yield put(pushRepos({ username, repos: data }));
    yield put(push(`/repos/${username}`));
    const lastLink = link
      ? link.split(',').find(str => str.includes('rel="last"'))
      : 'page=1>';
    const idx1 = lastLink.indexOf('page=');
    const idx2 = lastLink.indexOf('>', idx1);
    const lastPage = parseInt(lastLink.slice(idx1 + 5, idx2), 10);
    for (let i = 2; i <= lastPage; i += 1) {
      const { data } = yield call(listRepos, username, i);
      yield put(pushRepos({ username, repos: data }));
    }
    yield put(fetchSuccess());
  } catch (error) {
    yield put(fetchFail());
  }
}

// Watchers
function* watchPushUser() {
  yield takeEvery(PUSH_USER, pushUserSaga);
}

export default function* usersSaga() {
  yield all([watchPushUser()]);
}
