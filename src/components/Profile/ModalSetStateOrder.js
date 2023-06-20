import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function ModalSetStateOrder(props) {
  const { show, setShow, callStateOrder, itemCancelState } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleSuccess = async () => {
    setIsLoading(true);
    await callStateOrder();
    handleClose();
    setIsLoading(false);
  };

  return (
    <div className="">
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-state-order mt-5 pt-5"
      >
        <Modal.Header
          closeButton
          className="container"
          style={{ border: "none" }}
        >
          <Modal.Title>Bạn có chắc chắn muốn huỷ đơn hàng?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ border: "none" }}>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ bỏ
          </Button>
          <Button
            variant="success"
            onClick={handleSuccess}
            disabled={isLoading}
          >
            Xác nhận
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm ms-1"
                role="status"
              ></span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalSetStateOrder;
