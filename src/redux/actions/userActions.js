import { useSelector } from "react-redux";
import {
  getSearchOrder,
  putUpdateInfoUser,
} from "../../components/services/apiServices";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const UPDATE_USER = "UPDATE_USER";
export const FETCH_LIST_ORDER = "FETCH_LIST_ORDER";
export const DELETE_LIST_ORDER = "DELETE_LIST_ORDER";

export const getAllListOrder = (data) => {
  return async (dispatch, payload) => {
    const resListOrder = async () => {
      return await getSearchOrder(data);
    };
    setTimeout(() => {
      if (resListOrder.length > 0) {
        let aOrder = resListOrder[0];
        dispatch(addListOrderRedux(aOrder));
      }
    }, 1000);
  };
};

export const addListOrderRedux = (data) => {
  return {
    type: FETCH_LIST_ORDER,
    payload: data,
  };
};

export const deleteListOrderUser = () => {
  return {
    type: DELETE_LIST_ORDER,
  };
};

export const putInfoUserAction = (data) => {
  return async (dispatch, payload) => {
    const resUpdate = await putUpdateInfoUser(
      data.id,
      data.username,
      data.role,
      data.password,
      data.name,
      data.phone,
      data.birthday,
      data.address,
      data.province,
      data.district,
      data.ward,
      data.listOrder
    );
  };
};

export const putUpdateInfoUserRedux = (data) => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};
