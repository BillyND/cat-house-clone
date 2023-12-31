import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  putInfoUserAction,
  putUpdateInfoUserRedux,
} from "../../redux/actions/userActions";
import { putCartOrder } from "../services/apiServices";
import ModalSetStateOrder from "./ModalSetStateOrder";
function UserListOrder(props) {
  const infoUser = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const [showModalState, setShowModalState] = useState(false);
  const [dataStateOrder, setDataStateOrder] = useState();
  const [itemCancelState, setItemCancelState] = useState();
  const [cartSetState, setCartSsetState] = useState("");
  let listOrder = [];

  if (infoUser.listOrder && infoUser.listOrder.length > 0) {
    for (let i = infoUser.listOrder.length - 1; i >= 0; i--) {
      listOrder.push(infoUser.listOrder[i]);
    }
  }

  const handeDeleteState = (event) => {
    let cloneInfoUser = JSON.parse(JSON.stringify(infoUser));
    setShowModalState(true);
    let indexOrderState = infoUser.listOrder.findIndex(
      (item) => item.id === event.id
    );
    cloneInfoUser.listOrder[indexOrderState].state = false;
    setCartSsetState(cloneInfoUser.listOrder[indexOrderState]);
    setDataStateOrder(cloneInfoUser);
    setItemCancelState(event);
  };

  const actioneDeleteState = async () => {
    const resSetState = await putCartOrder(cartSetState.id, cartSetState);
    dispatch(putUpdateInfoUserRedux(dataStateOrder));
    dispatch(putInfoUserAction(dataStateOrder));
    toast.success(`Huỷ đơn hàng #${itemCancelState.id} thành công!`);
  };

  return (
    <>
      <ModalSetStateOrder
        show={showModalState}
        setShow={setShowModalState}
        callStateOrder={actioneDeleteState}
        itemCancelState={itemCancelState}
      />
      {listOrder && listOrder.length > 0 ? (
        <div className="user-profile">
          <h2>Danh sách đơn hàng {}</h2>
          {listOrder.map((item) => {
            let resultTotalPrice =
              item.totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 3,
              }) + " đ";
            return (
              <div key={uuidv4()}>
                {item.id ? (
                  <div key={uuidv4()} className="user-order-container mt-3">
                    <div className="user-order-header">
                      <div>
                        <div>#{item.id}</div>
                        <div style={{ fontWeight: "400" }}>{item.createAt}</div>
                      </div>
                      <div className="state-order">
                        {item.state == "waiting" ? (
                          <div> Chờ xác nhận</div>
                        ) : (
                          <div style={{ color: "red" }}>Đã huỷ</div>
                        )}
                      </div>
                    </div>
                    {item.cart.map((itemCart) => {
                      var priceProduct = +itemCart.quantity * +itemCart.price;
                      let resultPrice =
                        priceProduct.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 3,
                        }) + " đ";
                      return (
                        <div
                          key={uuidv4().toString()}
                          className="user-order-content"
                        >
                          <div className="top  p-3">
                            <div className="image-detail-order">
                              <img
                                loading="lazy"
                                className="image-detail"
                                src={itemCart.image}
                              />
                            </div>
                            <div className="detail-order">
                              <span>{itemCart.name}</span>
                              <span style={{ fontWeight: "600" }}>
                                x{itemCart.quantity}
                              </span>
                              <span style={{ fontWeight: "600" }}>
                                {resultPrice}
                              </span>
                            </div>
                            <div className="button-rate1 ">
                              <button className="btn btn-dark mb-2 mt-2">
                                Đánh giá
                              </button>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center">
                            <button className="button-rate1 button-rate2 btn btn-dark mb-3 mt-2">
                              Đánh giá{" "}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <div className="user-order-footer d-flex justify-content-between">
                      {item.state === "waiting" ? (
                        <div
                          className="delete-order"
                          onClick={() => handeDeleteState(item)}
                        >
                          Huỷ đơn
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="total-price">
                        Tổng đơn hàng: {resultTotalPrice}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <h2>Bạn chưa có đơn hàng</h2>
      )}
    </>
  );
}

export default UserListOrder;
