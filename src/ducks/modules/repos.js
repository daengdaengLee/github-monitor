// Actions
export const FETCH_START = 'repos/FETCH_START';
export const FETCH_SUCCESS = 'repos/FETCH_SUCCESS';
export const FETCH_FAIL = 'repos/FETCH_FAIL';
export const PUSH_REPO = 'repos/PUSH_REPO';

// Init State
const initState = {
  isFetching: true,
  repos: [],
};

// Reducer
export default function reposReducer(state = initState, action = {}) {
  switch (action.type) {
  case FETCH_START:
    return applyFetchStart(state, action);
  case FETCH_SUCCESS:
    return applyFetchSuccess(state, action);
  case FETCH_FAIL:
    return applyFetchFail(state, action);
  case PUSH_REPO:
    return applyPushRepo(state, action);
  default:
    return state;
  }
}

// Action Creators
export function fetchStart({ username }) {
  return {
    type: FETCH_START,
    username,
  };
}

export function fetchSuccess() {
  return {
    type: FETCH_SUCCESS,
  };
}

export function fetchFail() {
  return {
    type: FETCH_FAIL,
  };
}

export function pushRepo({ repo }) {
  return {
    type: PUSH_REPO,
    repo,
  };
}

// Reducer Functions
function applyFetchStart(state) {
  return {
    isFetching: true,
  };
}

function applyFetchSuccess(state) {
  return {
    ...state,
    isFetching: false,
  };
}

function applyFetchFail(state) {
  return {
    ...state,
    isFetching: false,
  };
}

function applyPushRepo(state, { repo }) {
  return {
    ...state,
    repos: [...state.repos, repo],
  };
}
