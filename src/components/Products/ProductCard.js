import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartRedux } from "../../redux/actions/productActions";
import { ImEye } from "react-icons/im";

function ProductCard(props) {
  const [isDrag, setIsDrag] = useState();
  useEffect(() => {}, []);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClickProduct = (event) => {
    navigate(`/product/${event}`);
  };
  const { product } = props;
  var number = +product.price;
  var numberOld = Math.floor(+product.price * 1.25);
  const result =
    number.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }) + " đ";
  const resultOld =
    numberOld.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }) + " đ";

  const handleCheckout = async () => {
    dispatch(addToCartRedux(product));
    navigate(`/checkout/${product.id}`);
  };
  let funcCountMouse;
  let countMouseDown = 0;
  useEffect(() => {
    // console.log("eff")
    return () => {
      if (countMouseDown > 10) {
        clearInterval(funcCountMouse);
      }
    };
  }, [countMouseDown]);

  const handleMouseDown = async () => {
    // console.log("down")
    let clickTime = Date.now();
    setIsDrag(clickTime);

    // setTimeout(() => {
    //     console.log(isDrag)
    //     // setIsDrag(Date.now())
    // }, 40)
  };
  const handleMouseUp = async (productId) => {
    let currentTime = Date.now();
    let timeCount = currentTime - isDrag;
    // console.log("up", timeCount)
    if (timeCount < 300) {
      handleClickProduct(productId);
    }
  };

  return (
    <div
      className="card-product"
      onMouseDown={() => handleMouseDown()}
      onMouseUp={() => handleMouseUp(product.id)}
      // onDragCapture={() => { console.log("drag") }}
    >
      <div className="image-container">
        <div className="first">
          <div className="d-flex justify-content-between align-items-center">
            {/* <span className="discount" onClick={() => handleClickProduct(product.id)}>-25%</span> */}
            {/* <span className="wishlist"><i className="fa fa-heart-o"></i></span> */}
          </div>
        </div>

        <img
          src={product.image1}
          className="img-fluid rounded thumbnail-image1"
        />
        <img
          src={product.image2}
          className="img-fluid rounded thumbnail-image2"
        />
        <ImEye className="icon-eye" />
      </div>

      <div className="product-detail-container p-2">
        <div className="">
          {product.description ? (
            <h5 className="dress-name ">{product.description}</h5>
          ) : (
            <h5 className="dress-name ">
              {product.type}, {product.color}, {product.gender}, {product.age}
            </h5>
          )}

          <div className="price-old-new">
            <div className="text-price">
              <span className="new-price text-center">{result}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
