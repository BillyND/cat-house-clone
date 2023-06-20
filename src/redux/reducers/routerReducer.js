import { CHANGE_ROUTE } from "../actions/routerActions";
import {
  UPDATE_USER,
  USER_LOGIN,
  USER_LOGOUT,
  FETCH_LIST_ORDER,
  DELETE_LIST_ORDER,
} from "../actions/userActions";

const INITIAL_STATE = {
  numberRouter: 0,
};

const routerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {
        ...state,
        numberRouter: action.payload,
      };

    default:
      return state;
  }
};

export default routerReducer;
