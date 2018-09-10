// Actions
export const FETCH_START = 'commits/FETCH_START';
export const FETCH_SUCCESS = 'commits/FETCH_SUCCESS';
export const FETCH_FAIL = 'commits/FETCH_FAIL';
export const PUSH_COMMITS = 'commits/PUSH_COMMITS';

// Init State
const initState = {
  isFetching: false,
  commits: {},
};

// Reducer
export default function commitsReducer(state = initState, action = {}) {
  switch (action.type) {
  case FETCH_START:
    return applyFetchStart(state, action);
  case FETCH_SUCCESS:
    return applyFetchSuccess(state, action);
  case FETCH_FAIL:
    return applyFetchFail(state, action);
  case PUSH_COMMITS:
    return applyPushCommits(state, action);
  default:
    return state;
  }
}

// Action Creators
export function fetchStart({ owner, repo }) {
  return {
    type: FETCH_START,
    owner,
    repo,
  };
}

export function fetchSuccess({ owner, repo }) {
  return {
    type: FETCH_SUCCESS,
    owner,
    repo,
  };
}

export function fetchFail({ owner, repo }) {
  return {
    type: FETCH_FAIL,
    owner,
    repo,
  };
}

export function pushCommits({ owner, repo, commits }) {
  return {
    type: PUSH_COMMITS,
    owner,
    repo,
    commits,
  };
}

// Reducer Functions
function applyFetchStart(state) {
  return {
    ...state,
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

function applyPushCommits(state, { owner, repo, commits }) {
  const key = `${owner}/${repo}`;
  const isInit = state.commits.key === undefined || state.commits.key === null;
  const pushedCommits = isInit
    ? { ...state.commits, [key]: commits }
    : { ...state.commits, [key]: [...state.commits[key], ...commits] };
  return {
    ...state,
    commits: pushedCommits,
  };
}
