// Actions
export const FETCH_START = 'repos/FETCH_START';
export const FETCH_SUCCESS = 'repos/FETCH_SUCCESS';
export const FETCH_FAIL = 'repos/FETCH_FAIL';
export const PUSH_REPOS = 'repos/PUSH_REPOS';

// Init State
const initState = {
  isFetching: true,
  repos: {},
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
  case PUSH_REPOS:
    return applyPushRepos(state, action);
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

export function pushRepos({ username, repos }) {
  return {
    type: PUSH_REPOS,
    username,
    repos,
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

function applyPushRepos(state, { username, repos }) {
  const isInit = !state.repos.hasOwnProperty(username);
  const updatedRepos = isInit
    ? { ...state.repos, [username]: repos }
    : { ...state.repos, [username]: [...state.repos[username], ...repos] };
  return {
    ...state,
    repos: updatedRepos,
  };
}
