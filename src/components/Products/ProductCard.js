import React, { useEffect } from "react";
import { ImEye } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  let isClickProduct = false;
  let isDragProduct = false;
  let idProductClicked = "";

  useEffect(() => {}, []);

  const navigate = useNavigate();

  const handleClickProduct = (event) => {
    navigate(`/product/${event}`);
  };
  const { product } = props;
  var number = +product.price;
  const result =
    number.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }) + " đ";

  const handleMouseDown = async (idProduct) => {
    idProductClicked = idProduct;
    isClickProduct = true;
  };

  const handleMouseUp = async (productId) => {
    console.log(">>>>isDragProduct:", isDragProduct);
    isClickProduct = false;
    if (isDragProduct) {
      isDragProduct = false;
    } else {
      handleClickProduct(productId);
    }
  };

  return (
    <div
      className="card-product"
      onMouseDown={() => handleMouseDown(product?.id)}
      onMouseUp={() => handleMouseUp(product?.id)}
      onMouseMove={(e) => {
        if (isClickProduct) {
          isDragProduct = true;
        }
      }}
    >
      <div className="image-container">
        <div className="first">
          <div className="d-flex justify-content-between align-items-center"></div>
        </div>

        <img
          loading="lazy"
          src={product.image1}
          className="img-fluid rounded thumbnail-image1"
          alt=""
        />
        <span className="img-fluid rounded thumbnail-image1" />
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
