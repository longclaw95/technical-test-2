import { authActions } from "./actions";

const initState = {
  user: null,
  filter: "available",
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case authActions.SETUSER:
      return { ...state, user: action.user };

    case authActions.SETFILTER:
      return { ...state, filter: action.filter };

    default:
      return state;
  }
}
