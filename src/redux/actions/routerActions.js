export const CHANGE_ROUTE = "CHANGE_ROUTE";

export const changeRouteRedux = (data) => {
  return {
    type: CHANGE_ROUTE,
    payload: data,
  };
};
