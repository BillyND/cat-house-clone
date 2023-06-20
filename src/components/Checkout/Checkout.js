import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Checkout.scss"
import { GrClose } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import { decreaseBuyOne, decreaseCart, orderOne, deleteCart, increaseCart, deleteAllCart } from '../../redux/actions/productActions';
import Select from 'react-select';
import { getDistrict, getProvince, getWard, postCartOrder } from '../services/apiServices';
import { toast } from 'react-toastify';
import OrderCart from './OrderCart';
import _ from "lodash"
import { putInfoUserAction, putUpdateInfoUserRedux } from '../../redux/actions/userActions';
import { changeRouteRedux } from '../../redux/actions/routerActions';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const noneOptions = []

function Checkout(props) {
    const countCart = useSelector(state => state.product.countCart)
    const param = useParams()
    const navigate = useNavigate()
    const dataCartAll = useSelector(state => state.product.cartProduct)
    const userLogin = useSelector(state => state.account.user)
    const auth = useSelector(state => state.account.user.auth)
    const cloneUserLogin = _.cloneDeep(userLogin)
    const dispatch = useDispatch()
    if (!cloneUserLogin.listOrder) {
        cloneUserLogin.listOrder = []
    }

    let totalPrice = 0
    const [resultTotalPrice, setResultTotalPrice] = useState(0)
    const [displayTotalPrice, setDisplayTotalPrice] = useState('0 đ')
    const [showModalOrder, setShowModalOrder] = useState(false)
    const [codeProduct, setCodeProduct] = useState("")
    const handelIncreaseProduct = (data) => {
        dispatch(increaseCart(data))
    }
    const [name, setName] = useState(userLogin.name || "")
    const [phone, setPhone] = useState(userLogin.phone || "")
    const [email, setEmail] = useState(userLogin.username || '')
    const [address, setAddress] = useState(userLogin.address || '')
    const [ward, setWArd] = useState(userLogin.ward || '')
    const [district, setDistrict] = useState(userLogin.district || '')
    const [province, setProvince] = useState(userLogin.province || '')
    const [optionsWard, setOptionsWArd] = useState('')
    const [optionsDistrict, setOptionsDistrict] = useState('')
    const [optionsProvince, setOptionsProvince] = useState('')
    let indexCartBuyOne = dataCartAll.findIndex(item => +item.id === +param.id)
    const [counterBuyone, setCounterBuyone] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    let dataCart = []
    let itemBuyOne = dataCartAll[+indexCartBuyOne]
    if (!param.id) {
        dataCart = dataCartAll
    }

    if (param.id) {
        if (indexCartBuyOne !== -1) {
            if (counterBuyone === 0) {
                if (itemBuyOne.quantity > 1) {
                    dispatch(decreaseBuyOne(itemBuyOne))
                }
                setCounterBuyone(prev => prev + 1)
            }
            dataCart.push(itemBuyOne)
        }
    }

    const handelDecreaseProduct = (data) => {
        dispatch(decreaseCart(data))
    }

    const handelDeleteProduct = (data) => {
        if (!param.id) {
            dispatch(deleteCart(data))
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchProvince()
        dispatch(changeRouteRedux(-1))
    }, [])

    const fetchProvince = async () => {
        let options = [];
        try {
            const resProvince = await getProvince()
            resProvince.map((item) => {
                options.push({
                    value: item.name,
                    label: item.name,
                    code: item.code,
                    codename: item.codename,
                    district: item.district,
                    division_type: item.division_type,
                    name: item.name,
                    phone_code: item.phone_code
                })
            })
            setProvince(userLogin.province || "")
            setOptionsProvince(options)
        } catch (error) {
            toast.error("Máy chủ lỗi!")
        }
    }

    const handleChooseProvince = async (type, value) => {
        let options = [];

        switch (type) {
            case "PROVINCE":
                setProvince(value.value)
                setDistrict('')
                setWArd('')
                try {
                    const resDistrict = await getDistrict(value.code)
                    resDistrict.districts.map((item) => {
                        options.push({
                            value: item.name,
                            label: item.name,
                            code: item.code,
                            codename: item.codename,
                            district: item.district,
                            division_type: item.division_type,
                            name: item.name,
                            phone_code: item.phone_code
                        })
                    })
                    setOptionsDistrict(options)
                } catch (error) {
                    toast.error("Máy chủ lỗi!")
                }
                break;
            case "DISTRICT":
                setWArd('')
                try {
                    setDistrict(value.value)
                    const resWard = await getWard(value.code)
                    resWard.wards.map((item) => {
                        options.push({
                            value: item.name,
                            label: item.name,
                            code: item.code,
                            codename: item.codename,
                            ward: item.ward,
                            division_type: item.division_type,
                            name: item.name,
                            phone_code: item.phone_code
                        })
                    })
                    setOptionsWArd(options)
                } catch (error) {
                    toast.error("Máy chủ lỗi!")
                }
                break;
            case "WARD":
                setWArd(value.value)
                break;

            default:
                toast.error("Máy chủ lỗi!")
        }
    }

    useEffect(() => {
        countPrice()
    }, [dataCart])

    const countPrice = () => {
        let count = 0
        dataCart.map(item => {
            count += +item.quantity * +item.price
        })
        let resultPrice = count.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
        setResultTotalPrice(count)
        setDisplayTotalPrice(resultPrice)
    }

    const regexPhoneNumber = phone => {

        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

        return phone.match(regexPhoneNumber) ? true : false;
    }

    const regexName = (name) => {
        const regexNameMAtch = /[a-zA-Z]+(?: [a-zA-Z]+)+/gm
        return name.match(regexNameMAtch) ? true : false;
    }
    const nameRef = useRef()
    const phoneRef = useRef()
    const provinceRef = useRef()
    const districtRef = useRef()
    const wardRef = useRef()

    const handleOrder = async () => {
        setIsLoading(true)


        if (dataCart.length === 0) {
            toast.error("Giỏ hàng trống!")
            setIsLoading(false)
            return
        }

        //validate
        if (!name || !phone || !province || !district || !ward || !regexPhoneNumber(phone) || !regexName(name)) {
            if (!name) {
                setIsLoading(false)
                toast.error("Tên không được để trống!")
                nameRef.current.focus()

                return
            }
            if (!regexName(name)) {
                setIsLoading(false)
                toast.error("Tên phải ít nhất hai từ!")
                nameRef.current.focus()

                return
            }
            if (!phone) {
                setIsLoading(false)
                toast.error("SĐT không được để trống!")
                phoneRef.current.focus()

                return
            }
            if (!regexPhoneNumber(phone)) {
                setIsLoading(false)
                toast.error("SĐT không đúng định dạng!")
                phoneRef.current.focus()

                return
            }

            if (!province) {
                setIsLoading(false)
                toast.error("Tỉnh không được để trống!")
                province.current.focus()

                return
            }
            if (!district) {
                setIsLoading(false)
                toast.error("Huyện không được để trống!")
                districtRef.current.focus()

                return
            }
            if (!ward) {
                setIsLoading(false)
                toast.error("Xã không được để trống!")
                wardRef.current.focus()

                return
            }


            setIsLoading(false)
            return
        }

        let newID = Math.floor(Math.random() * Date.now())
        let listCart = {}
        let cartPush = []

        dataCart.map(item => {
            cartPush.push({
                cartId: item.id,
                quantity: +item.quantity,
                price: +item.price,
                image: item.image1,
                name: `${item.description}`
            })
        })
        var d = new Date();
        function createAt(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = '' + d.getFullYear();
            let hour = '' + d.getHours();
            let minute = '' + d.getMinutes();
            let second = '' + d.getSeconds();



            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            if (hour.length < 2) {
                if (hour === 0) {
                    hour = '00';
                } else {
                    hour = '0' + String(hour)
                }
            }
            if (minute.length < 2) {
                if (minute === 0) {
                    minute = '00';
                } else {
                    minute = '0' + String(minute)
                }
            }
            if (second.length < 2) {
                if (second === 0) {
                    second = '00';
                } else {
                    second = '0' + String(second)
                }
            }

            let createAt = String(hour) + ":" + String(minute) + ":" + String(second) + " " + day + "/" + month + "/" + year

            return createAt;
        }


        listCart = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            ward: ward,
            district: district,
            province: province,
            id: newID,
            state: "waiting",
            cart: cartPush,
            totalPrice: resultTotalPrice,
            createAt: createAt(d)
        }

        try {
            if (auth === true) {
                //push order to user
                cloneUserLogin.listOrder.push(listCart)
                dispatch(putUpdateInfoUserRedux(cloneUserLogin))
                dispatch(putInfoUserAction(cloneUserLogin))
            }
            await postCartOrder(listCart)

            if (cartPush.length < dataCartAll.length) {
                dispatch(orderOne(cartPush))
            } else {
                dispatch(deleteAllCart())
            }
            setCodeProduct(newID)
            setTimeout(() => {
                setIsLoading(false)
                setShowModalOrder(true)
            }, 500)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error("Máy chủ lỗi")
        }
    }



    return (
        <div className='checkout-container container  pb-5'>
            <div className='nav-link-address pb-2'>


                <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Trang chủ </span>
                / Thanh toán ({countCart})
            </div>
            <div className='checkout-header '>

                <div className='list-cart-product'>

                    <h5 style={{ fontWeight: "700" }}>Giỏ hàng</h5>

                    {
                        dataCart.length > 0 ?
                            <>
                                {

                                    <>
                                        {
                                            dataCart.map((item) => {
                                                var number = +item.quantity * +item.price;
                                                let resultPrice = number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
                                                totalPrice += number

                                                return (
                                                    <div className='content-checkout pt-3 pb-3' key={uuidv4()}>
                                                        <div className='image-product-checkout'>
                                                            <img src={item.image1} />
                                                            <span className='counter-product'>
                                                                {item.quantity}
                                                            </span>
                                                        </div>
                                                        <div className='content-product-checkout'>
                                                            <div className='header-product-checkout'>
                                                                <h6 className='infor-product-cart' onClick={() => { navigate(`/product/${item.id}`) }}>
                                                                    {item.description}
                                                                </h6>
                                                                <GrClose onClick={() => handelDeleteProduct(item)} className='icon-close' />
                                                            </div>
                                                            <div className='footer-product-checkout'>
                                                                <div className="quantity">
                                                                    <span className='minus' onClick={() => handelDecreaseProduct(item)}>-</span>
                                                                    <span>{+item.quantity}</span>
                                                                    <span className='plus' onClick={() => handelIncreaseProduct(item)}>+</span>
                                                                </div>
                                                                <div  >
                                                                    {resultPrice}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                }

                                <hr />

                                <div className='total-price-demo'>
                                    <div>
                                        <p>Tạm tính</p>
                                        <p>Phí giao hàng</p>

                                    </div>
                                    <div>
                                        <p className='number'>{displayTotalPrice}</p>
                                        <p className='number'>Miễn phí</p>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className='total-price-demo'>
                                    <div >
                                        <p>Tổng</p>
                                    </div>
                                    <div>
                                        <p className='price' >{displayTotalPrice}</p>
                                    </div>
                                </div>
                            </> :
                            <>
                                Giỏ hàng trống
                                <hr />
                            </>

                    }

                </div>

                <div className='infro-transport'>
                    <h5 style={{ fontWeight: "700" }} >Thông tin vận chuyển</h5>
                    <form className='needs-validation' >
                        <div className="row">
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputName">Họ và tên</label>
                                <input type="text" className="form-control" id="inputName" placeholder={`${userLogin.name ? "" : "Họ và tên"}`} required
                                    value={name}
                                    ref={nameRef}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputPhone">Số điện thoại</label>
                                <input type="number" className="form-control" id="inputPhone" placeholder={`${userLogin.name ? "" : "Số điện thoại"}`}
                                    value={phone}
                                    ref={phoneRef}
                                    onChange={e => setPhone(e.target.value)}
                                    onWheel={event => event.currentTarget.blur()}
                                />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="inputEmail">Email</label>
                            <input type="text" className="form-control" id="inputEmail" placeholder={`${userLogin.name ? "" : "Email"}`}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>



                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="inputState">Thành phố/Tỉnh</label>
                                <Select
                                    ref={provinceRef}
                                    placeholder={<div>TP/Tỉnh</div>}
                                    onChange={e => handleChooseProvince("PROVINCE", e)}
                                    options={optionsProvince || noneOptions}
                                    value={{ label: province }}
                                />
                            </div>
                            <div className=" col-md-4 mb-3">
                                <label htmlFor="inputState">Quận/Huyện</label>
                                <Select
                                    ref={districtRef}
                                    placeholder={<div>Quận/Huyện</div>}
                                    onChange={e => handleChooseProvince("DISTRICT", e)}
                                    options={optionsDistrict || noneOptions}
                                    value={{ label: district }}
                                />
                            </div>
                            <div className=" col-md-4 mb-3">
                                <label htmlFor="inputState">Phường/xã</label>
                                <Select
                                    ref={wardRef}
                                    placeholder={<div>Phường/xã</div>}
                                    onChange={e => handleChooseProvince("WARD", e)}
                                    options={optionsWard || noneOptions}
                                    value={{ label: ward }}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="inputAddress">Địa chỉ</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder={`${userLogin.name ? "" : "Địa chỉ"}`}
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="form-">
                                <label htmlFor="inputNote">Ghi chú</label>
                                <input type="text" className="form-control" id="inputNote" placeholder='Ghi chú' />
                            </div>
                        </div>
                        <hr />
                        <h5 style={{ fontWeight: "700" }} >Hình thức thanh toán</h5>

                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                Thanh Toán MoMo
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="radio" name="cod-pay" id="cod-pay" defaultChecked />
                            <label className="form-check-label" htmlFor="cod-pay">
                                COD - Thanh toán khi nhận hàng
                            </label>
                        </div>
                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                Ví điện tử ZaloPay
                            </label>
                        </div>
                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                Ví ShopeePay
                            </label>
                        </div>
                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                Thẻ ATM / Internet Banking / Thẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card) / VNPay QR
                            </label>
                        </div>
                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                VNPay QR
                            </label>
                        </div>
                        <button type="button" onClick={() => handleOrder()} className="btn btn-danger mb-5" style={{ width: "100%" }}>
                            {
                                isLoading && <span className="spinner-grow spinner-grow-sm mx-2" style={{ color: "#ffffff00" }} role="status"  ></span>
                            }
                            {`Thanh toán ${displayTotalPrice}`}
                            {
                                isLoading && <span className="spinner-border spinner-border-sm mx-2" role="status" ></span>
                            }
                        </button>
                    </form>
                </div>

            </div>

            <OrderCart
                show={showModalOrder}
                setShow={setShowModalOrder}
                codeProduct={codeProduct}
            />
        </div>
    );
}

export default Checkout;