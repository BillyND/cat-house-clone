import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../services/apiServices';
import catGuest from "../../../assets/catGuest.jpg"

function ViewProduct(props) {
    const { show, setShow, fetchAllUsers, inforView, setInforView } = props
    const [category, setCategory] = useState("")
    const [collection, setCollection] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [previewImage1, setPreviewImage1] = useState('')
    const [previewImage2, setPreviewImage2] = useState('')
    const [previewImage3, setPreviewImage3] = useState('')


    const handleClose = () => {
        setShow(false);
        setDescription('')
        setCollection('')
        setCategory('')
        setPrice('')
        setImage1('')
        setImage2('')
        setImage3('')
        setPreviewImage1('')
        setPreviewImage2('')
        setPreviewImage3('')
    }

    useEffect(() => {
        console.log(inforView)
        setCollection(inforView.collection)
        setDescription(inforView.description)
        setCategory(inforView.category)
        setPrice(inforView.price)
        setImage1(inforView.image1)
        setImage2(inforView.image2)
        setImage3(inforView.image3)
        setPreviewImage1(inforView.image1)
        setPreviewImage2(inforView.image2)
        setPreviewImage3(inforView.image3)
    }, [inforView])


    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                className='p-2 pb-5 mt-4 pt-5'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form>
                        <div className="row" id='form'>
                            <div className="col-md-12">
                                <label>Miêu tả</label>
                                <input type="text" className="form-control mb-3"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label>Loại sản phẩm</label>
                                <input type="text" className="form-control"
                                    value={collection}
                                    onChange={e => setCollection(e.target.value)}
                                    disabled
                                />
                            </div>
                            {
                                collection === "Mèo" &&
                                <div className="form-group col-md-6 mb-3">
                                    <label>Giống mèo</label>
                                    <input type="text" className="form-control"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        disabled
                                    />
                                </div>
                            }
                            <div className="form-group col-md-6 mb-3">
                                <label>Giá</label>
                                <input type="number" className="form-control"
                                    disabled
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            {/* <div className="form-group col-md-3 mb-3">
                                <label >Ảnh</label>
                            </div> */}



                            <div className='preview-image'>
                                {
                                    previewImage1 || previewImage2 || previewImage3 ?
                                        <>
                                            {previewImage1 ?
                                                <div className='list-image-preview mx-1'>
                                                    < img className='image-preview' src={previewImage1} />
                                                </div>
                                                :
                                                <></>
                                            }
                                            {previewImage2 ?
                                                <div className='list-image-preview mx-1'>
                                                    < img className='image-preview' src={previewImage2} />
                                                </div> :
                                                <></>
                                            }
                                            {previewImage3 ?
                                                <div className='list-image-preview mx-1'>
                                                    < img className='image-preview' src={previewImage3} />
                                                </div>
                                                :
                                                <></>
                                            }</> :
                                        <div className='list-image-preview mx-1'>
                                            < img className='image-preview' src={catGuest} />
                                        </div>
                                }
                            </div>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewProduct;