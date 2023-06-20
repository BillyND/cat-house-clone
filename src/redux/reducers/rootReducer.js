import { combineReducers } from "redux";
import productReducer from "./productReducer";
import routerReducer from "./routerReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  account: userReducer,
  product: productReducer,
  router: routerReducer,
});

export default rootReducer;
