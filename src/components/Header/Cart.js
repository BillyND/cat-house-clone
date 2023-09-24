import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GrClose } from "react-icons/gr";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SHOW_CART, deleteCart } from "../../redux/actions/productActions";
import "./Header.scss";
function Cart(props) {
  const { show } = props;
  const dataCart = useSelector((state) => state.product.cartProduct);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = window.innerWidth < 991;

  const handleClose = () => {
    dispatch({
      type: SHOW_CART,
      payload: false,
    });
  };
  const handleCheckout = () => {
    handleClose();
    navigate("/checkout");
  };

  const handleDetailsProduct = (event) => {
    navigate(`/product/${event}`);
    handleClose();
  };

  const handleDeleteCart = (event) => {
    dispatch(deleteCart(event));
  };

  return (
    <div className="cart-model mt-5">
      <Modal
        show={show}
        onHide={handleClose}
        className="cart-shopping pt-5 mt-5"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Giỏ hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PerfectScrollbar>
            <div className="cart-body">
              {dataCart.length <= 0 ? (
                <div style={{ textAlign: "center" }}>
                  Giỏ hàng của bạn trống
                </div>
              ) : (
                <>
                  {dataCart.map((item) => {
                    var number = +item.price;
                    const result =
                      number.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 3,
                      }) + " đ";
                    return (
                      <div key={item.id} className="cart-product mt-1 mb-5">
                        <div
                          className="img-cart-product mt-1"
                          onClick={() => handleDetailsProduct(item.id)}
                        >
                          <img
                            loading="lazy"
                            className="img-cart-product"
                            src={item.image1}
                          />
                          <span className="quantity-product">
                            {item.quantity || 1}
                          </span>
                        </div>
                        <div className="detail-product-cart">
                          <div
                            className="detail"
                            onClick={() => handleDetailsProduct(item.id)}
                          >
                            {isMobile
                              ? ` ${item.description.slice(0, 30)} ... `
                              : item.description}
                          </div>
                          <div className="price me-5">{result}</div>
                        </div>
                        <GrClose
                          className="icon-delete-cart "
                          onClick={() => handleDeleteCart(item)}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </PerfectScrollbar>
        </Modal.Body>
        {dataCart.length <= 0 ? (
          <></>
        ) : (
          <Modal.Footer>
            <Button variant="danger" onClick={handleCheckout}>
              Thanh toán
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default Cart;
