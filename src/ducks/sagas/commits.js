import { all, takeEvery, call, put } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  pushCommits,
  fetchSuccess,
  fetchFail,
} from '../modules/commits';
import { listCommits } from '../../assets/js/requests';

// Workers
function* fetchStartSaga({ owner, repo }) {
  let successFlag = true;
  const { success, commits, link } = yield call(listCommits, owner, repo);
  yield put(pushCommits({ owner, repo, commits: success ? commits : [] }));
  successFlag = successFlag && success;
  if (!success) {
    yield put(fetchFail({ owner, repo }));
    return;
  }
  const lastLink = link
    ? link.split(',').find(str => str.includes('rel="last"'))
    : 'page=1>';
  const idx1 = lastLink.indexOf('page=');
  const idx2 = lastLink.indexOf('>', idx1);
  const lastPage = parseInt(lastLink.slice(idx1 + 5, idx2), 10);
  for (let i = 2; i <= lastPage; i += 1) {
    const { success, commits } = yield call(listCommits, owner, repo, i);
    yield put(pushCommits({ owner, repo, commits: success ? commits : [] }));
    successFlag = successFlag && success;
  }
  yield put(
    successFlag ? fetchSuccess({ owner, repo }) : fetchFail({ owner, repo }),
  );
}

function* fetchSuccessSaga({ owner, repo }) {
  yield notification.success({
    message: 'Success to fetch commits',
    description: `Fetch ${owner}/${repo}'s commits`,
  });
}

function* fetchFailSaga({ owner, repo }) {
  yield notification.error({
    message: 'Fail to fetch commits',
    description: `Fetch ${owner}/${repo}'s commits`,
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

export default function* commitsSaga() {
  yield all([watchFetchStart(), watchFetchSuccess(), watchFetchFail()]);
}