import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateProduct } from '../../services/apiServices';
import { toast } from 'react-toastify';
import "./Modal.scss"
import { useRef } from 'react';
import Select from 'react-select';



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
function UpdateProduct(props) {
    const { show, setShow, fetchAllUsers, inforUpdate, setInforUpdate } = props
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

    const refDescription = useRef()
    const refCategory = useRef()
    const refCollection = useRef()
    const refPrice = useRef()
    const refImage = useRef()

    const handleClose = () => {
        setShow(false);
        setDescription('')
        setCollection('')
        setPrice('')
        setImage1('')
        setImage2('')
        setImage3('')
        setPreviewImage1('')
        setPreviewImage2('')
        setPreviewImage3('')
        setInforUpdate('')
    }

    useEffect(() => {
        setCollection(inforUpdate.collection)
        setDescription(inforUpdate.description)
        setCategory(inforUpdate.category)
        setPrice(inforUpdate.price)
        setImage1(inforUpdate.image1)
        setImage2(inforUpdate.image2)
        setImage3(inforUpdate.image3)
        setPreviewImage1(inforUpdate.image1)
        setPreviewImage2(inforUpdate.image2)
        setPreviewImage3(inforUpdate.image3)
    }, [inforUpdate])



    const handleUpdateProduct = async () => {
        const resUpdateuser = await putUpdateProduct(inforUpdate.id, description, collection, category, price, image1, image2, image3)
        if (resUpdateuser) {
            fetchAllUsers()
            toast.success("Cập nhật thông tin thành công!")
            handleClose()
        }
    }
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
                    <Modal.Title>Sửa thông tin sản phẩm</Modal.Title>
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
                                    value={{
                                        label: collection,
                                        value: collection
                                    }}
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
                                        value={{
                                            label: category,
                                            value: category
                                        }}
                                    />
                                </div>
                            }
                            <div className="form-group col-md-6 mb-3">
                                <label>Giá</label>
                                <input type="number" className="form-control"
                                    placeholder='Giá'
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Ảnh 1</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12 mb-3" placeholder='Link ảnh 1...'
                                        value={image1}
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
                                    <input type="text" className=" form-control col-md-12" placeholder='Link ảnh 1...'
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
                        onClick={() => handleUpdateProduct()}
                    >Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateProduct;