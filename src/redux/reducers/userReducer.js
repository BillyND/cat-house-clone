import {
  UPDATE_USER,
  USER_LOGIN,
  USER_LOGOUT,
  FETCH_LIST_ORDER,
  DELETE_LIST_ORDER,
} from "../actions/userActions";

const INITIAL_STATE = {
  user: {
    id: "",
    username: "",
    role: "",
    password: "",
    name: "",
    phone: "",
    birthday: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    listOrder: [],
    auth: false,
  },
  listOrderUser: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: {
          id: action.user.id,
          username: action.user.username,
          role: action.user.role,
          password: action.user.password,
          name: action.user.name,
          phone: action.user.phone,
          birthday: action.user.birthday,
          address: action.user.address,
          province: action.user.province,
          district: action.user.district,
          ward: action.user.ward,
          listOrder: action.user.listOrder,
          auth: true,
        },
      };

    case USER_LOGOUT:
      return {
        ...state,
        user: {
          username: "",
          role: "",
          auth: false,
        },
      };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          id: state.user.id,
          username: action.payload.username,
          role: action.payload.role,
          password: action.payload.password,
          name: action.payload.name,
          phone: action.payload.phone,
          birthday: action.payload.birthday,
          address: action.payload.address,
          province: action.payload.province,
          district: action.payload.district,
          ward: action.payload.ward,
          listOrder: action.payload.listOrder,
          auth: true,
        },
      };

    case FETCH_LIST_ORDER:
      // let cloneListOrderUser =
      return {
        ...state,
        listOrderUser: [...state.listOrderUser, action.payload],
      };
    case DELETE_LIST_ORDER:
      return {
        ...state,
        listOrderUser: [],
      };

    default:
      return state;
  }
};

export default userReducer;
