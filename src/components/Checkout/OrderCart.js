import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function OrderCart(props) {
  const { show, setShow, codeProduct } = props;
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="cart-shopping"
      >
        <Modal.Header closeButton>
          <Modal.Title>Đặt hàng thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Mã đơn hàng của bạn là: <b>{codeProduct}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              navigate(`/search-order/${codeProduct}`);
            }}
          >
            Xem đơn hàng
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderCart;
