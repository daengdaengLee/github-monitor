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

import _ from 'underscore';

// const dummyCommits = [...Array(100)].map((v, i) => {
//   const month = _.random(1, 12);
//   const date = `2018-${month < 10 ? `0${month}` : month}-01T12:00:00Z`;
//   return { commit: { committer: { date } } };
// });

// Workers
function* fetchStartSaga({ owner, repo }) {
  // yield put(pushCommits({ owner, repo, commits: dummyCommits }));
  // return;
  yield put(pushCommits({ owner, repo, commits: null }));
  const allCommits = [];
  let successFlag = true;
  const { success, commits, link } = yield call(listCommits, owner, repo);
  allCommits.push(...commits);
  successFlag = successFlag && success;
  const lastLink = link
    ? link.split(',').find(str => str.includes('rel="last"'))
    : 'page=1>';
  const idx1 = lastLink.indexOf('page=');
  const idx2 = lastLink.indexOf('>', idx1);
  const lastPage = parseInt(lastLink.slice(idx1 + 5, idx2), 10);
  for (let i = 2; i <= lastPage; i += 1) {
    const { success, commits } = yield call(listCommits, owner, repo, i);
    if (!success) break;
    allCommits.push(...commits);
    successFlag = successFlag && success;
  }
  yield put(
    pushCommits({ owner, repo, commits: successFlag ? allCommits : undefined }),
  );
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
