export const authActions = {
  SETUSER: "SETUSER",
  SETFILTER: "SETFILTER",
};

export function setUser(user) {
  return { type: authActions.SETUSER, user };
}

export function setFilter(filter) {
  return {
    type: authActions.SETFILTER,
    filter,
  };
}
