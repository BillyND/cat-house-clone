import { CHANGE_ROUTE } from "../actions/routerActions";

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
