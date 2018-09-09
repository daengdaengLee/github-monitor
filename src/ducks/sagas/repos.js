import { all, takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import {
  FETCH_SUCCESS,
  FETCH_FAIL,
  FETCH_START,
  pushRepos,
  fetchSuccess,
  fetchFail,
} from '../modules/repos';
import { listRepos } from '../../assets/js/requests';

// Workers
function* fetchStartSaga({ username }) {
  let successFlag = true;
  const { success, repos, link } = yield call(listRepos, username);
  yield put(pushRepos({ username, repos: success ? repos : [] }));
  yield put(push(`/repos/${username}`));
  successFlag = successFlag && success;
  if (!success) {
    yield put(fetchFail({ username }));
    return;
  }
  const lastLink = link
    ? link.split(',').find(str => str.includes('rel="last"'))
    : 'page=1>';
  const idx1 = lastLink.indexOf('page=');
  const idx2 = lastLink.indexOf('>', idx1);
  const lastPage = parseInt(lastLink.slice(idx1 + 5, idx2), 10);
  for (let i = 2; i <= lastPage; i += 1) {
    const { success, repos } = yield call(listRepos, username, i);
    yield put(pushRepos({ username, repos: success ? repos : [] }));
    successFlag = successFlag && success;
  }
  yield put(successFlag ? fetchSuccess({ username }) : fetchFail({ username }));
}

function* fetchSuccessSaga({ username }) {
  yield notification.success({
    message: 'Success to fetch repos',
    description: `Fetch ${username}'s repos`,
  });
}

function* fetchFailSaga({ username }) {
  yield notification.error({
    message: 'Fail to fetch repos',
    description: `Fetch ${username}'s repos`,
  });
}

// Watchers
function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

function* watchFetchSuccess() {
  yield takeEvery(FETCH_SUCCESS, fetchSuccessSaga);
}

function* watchFetchFail() {
  yield takeEvery(FETCH_FAIL, fetchFailSaga);
}

export default function* reposSaga() {
  yield all([watchFetchStart(), watchFetchSuccess(), watchFetchFail()]);
}
