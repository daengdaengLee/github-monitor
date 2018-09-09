// Actions
export const PUSH_USER = 'users/PUSH_USER';

// Init State
const initState = {
  usernames: [],
};

// Reducer
export default function usersReducer(state = initState, action = {}) {
  switch (action.type) {
  case PUSH_USER:
    return applyPushUser(state, action);
  default:
    return state;
  }
}

// Action Creators
export function pushUser({ username }) {
  return {
    type: PUSH_USER,
    username,
  };
}

// Reudcer Functions
function applyPushUser(state, { username }) {
  const isInclude = state.usernames.includes(username);
  return isInclude
    ? state
    : {
      ...state,
      usernames: [...state.usernames, username],
    };
}
