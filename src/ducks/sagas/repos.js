import { all, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import { FETCH_SUCCESS, FETCH_FAIL } from '../modules/repos';

// Workers
function* fetchSuccessSaga({ username }) {
  yield notification.success({
    message: 'Success to fetch repos',
    description: `Fetch ${username}'s repos`,
  });
}

function* fetchFailSaga({ username }) {
  yield notification.success({
    message: 'Fail to fetch repos',
    description: `Fetch ${username}'s repos`,
  });
}

// Watchers
function* watchFetchSuccess() {
  yield takeEvery(FETCH_SUCCESS, fetchSuccessSaga);
}

function* watchFetchFail() {
  yield takeEvery(FETCH_FAIL, fetchFailSaga);
}

export default function* reposSaga() {
  yield all([watchFetchSuccess(), watchFetchFail()]);
}
