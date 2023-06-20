import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateProduct } from '../../services/apiServices';
import catGuest from "../../../assets/catGuest.jpg"
import Select from 'react-select';
import { useRef } from 'react';
function AddNewProduct(props) {
    const { show, setShow, fetchAllUsers } = props
    const [collection, setCollection] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [previewImage1, setPreviewImage1] = useState('')
    const [previewImage2, setPreviewImage2] = useState('')
    const [previewImage3, setPreviewImage3] = useState('')

    const refDescription = useRef()
    const refCollection = useRef()
    const refCategory = useRef()
    const refPrice = useRef()
    const refImage = useRef()

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


    const options = [
        {
            label: "Mèo",
            value: "Mèo"
        },
        {
            label: "Vệ sinh",
            value: "Vệ sinh"
        },
        {
            label: "Thức ăn",
            value: "Thức ăn"
        },
        {
            label: "Sức khoẻ",
            value: "Sức khoẻ"
        },
        {
            label: "Phụ kiện",
            value: "Phụ kiện"
        },
        {
            label: "Combo",
            value: "Combo"
        },
        {
            label: "Hotel",
            value: "Hotel"
        },
        {
            label: "Grooming&Spa",
            value: "Grooming&Spa"
        },
        {
            label: "Sữa, Thực phẩm bổ sung",
            value: "Sữa, Thực phẩm bổ sung"
        },
        {
            label: "Sữa tắm",
            value: "Sữa tắm"
        },
        {
            label: "Đồ chơi",
            value: "Đồ chơi"
        },

    ]
    const optionsCategory = [
        {
            label: "Anh Lông Dài",
            value: "Anh Lông Dài"
        },
        {
            label: "Anh Lông Ngắn",
            value: "Anh Lông Ngắn"
        },
        {
            label: "Ba Tư",
            value: "Ba Tư"
        },
        {
            label: "Bengal",
            value: "Bengal"
        },
        {
            label: "Birman",
            value: "Birman"
        },
        {
            label: "Khao Manee",
            value: "Khao Manee"
        },
        {
            label: "Munchkin",
            value: "Munchkin"
        },
        {
            label: "Mỹ Lông Ngắn",
            value: "Mỹ Lông Ngắn"
        },
        {
            label: "Ragdoll",
            value: "Ragdoll"
        },
        {
            label: "Rừng Na Uy",
            value: "Rừng Na Uy"
        }

    ]

    function checkURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const handleAddProduct = async () => {
        if (!price || !checkURL(image1) || !image1 || !collection || !description) {
            if (!description) {
                toast.error("Hãy điền miêu tả sản phẩm!")
                refDescription.current.focus()
                return
            }
            if (!collection) {
                toast.error("Hãy chọn loại sản phẩm!")
                refCollection.current.focus()
                return
            }

            if (!price) {
                toast.error("Hãy điền giá sản phẩm!")
                refPrice.current.focus()
                return
            }
            if (!image1) {
                toast.error("Hãy thêm ảnh cho sản phẩm!")
                refImage.current.focus()
                return
            } else if (!checkURL(image1)) {
                refImage.current.focus()
                toast.error("Link ảnh không hợp lệ!")
                return
            }
            return
        }

        const resCreateuser = await postCreateProduct(description, collection, category, price, image1, image2, image3)
        fetchAllUsers()

        if (resCreateuser) {
            toast.success("Thêm mới thú cưng thành công!")
        }

        handleClose()
    }


    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                className='p-2 pt-5 pb-5 mt-4'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thú cưng</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form>
                        <div className="row" id='form'>

                            <div className="col-md-12">
                                <label>Miêu tả</label>
                                <input type="text" className="form-control mb-3" placeholder="Miêu tả..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    ref={refDescription}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Loại sản phẩm</label>

                                <Select
                                    placeholder={<div>Loại sản phẩm</div>}
                                    onChange={e => setCollection(e.value)}
                                    options={options}
                                    ref={refCollection}

                                />
                            </div>
                            {
                                collection === "Mèo" &&
                                <div className="col-md-6 mb-3">
                                    <label>Giống mèo</label>

                                    <Select
                                        placeholder={<div>Giống mèo</div>}
                                        onChange={e => setCategory(e.value)}
                                        options={optionsCategory}
                                        ref={refCategory}

                                    />
                                </div>
                            }
                            <div className="form-group col-md-6 mb-3">
                                <label>Giá</label>
                                <input type="number" className="form-control"
                                    placeholder='Giá'
                                    value={price}
                                    ref={refPrice}
                                    onChange={e => setPrice(e.target.value)}
                                    onWheel={event => event.currentTarget.blur()}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Ảnh 1</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12 mb-3" placeholder='Link ảnh 1...'
                                        value={image1}
                                        ref={refImage}
                                        onChange={e => {
                                            setImage1(e.target.value)
                                            setPreviewImage1(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label >Ảnh 2</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12 mb-3" placeholder='Link ảnh 1...'
                                        value={image2}
                                        onChange={e => {
                                            setImage2(e.target.value)
                                            setPreviewImage2(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label >Ảnh 3</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12 mb-3" placeholder='Link ảnh 1...'
                                        value={image3}
                                        onChange={e => {
                                            setImage3(e.target.value)
                                            setPreviewImage3(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>


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
                                        <span>Preview image</span>
                                }
                            </div>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleAddProduct()}
                    >Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AddNewProduct
