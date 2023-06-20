import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CollapseFilter from "./CollapseFilter.js"
function ModalFilter(props) {
    const { show, setShow, setFilterPrice, removeFilter, setRemoveFilter } = props;

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bộ lọc</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <CollapseFilter
                        setFilterPrice={setFilterPrice}
                        removeFilter={removeFilter}

                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setRemoveFilter(!removeFilter)
                        handleClose()
                    }}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={handleClose}>Áp dụng</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default ModalFilter

