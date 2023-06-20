import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logoPetShop from "../../assets/logoPetHouse.png";
import logoMini from "../../assets/logoMini.png";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { countCartRedux, SHOW_CART } from "../../redux/actions/productActions";
import { MdShoppingCart } from "react-icons/md";
import { TiUser } from "react-icons/ti";
import Cart from "./Cart";
import { RiSearch2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

function Header({ clickContent }) {
  const numberRouter = useSelector((state) => state.router.numberRouter);
  const isAuthenticated = useSelector((state) => state.account.user.auth);
  const dataAddToCart = useSelector((state) => state.product.cartProduct);
  const showCartRedux = useSelector((state) => state.product.showCart);
  const countCart = useSelector((state) => state.product.countCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navExpanded, setVavExpanded] = useState(clickContent);
  let count = 0;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hState, sethState] = useState("top");
  const [keyWord, setKeyWord] = useState("");
  const refInput = useRef();

  useEffect(() => {
    dataAddToCart.map((item) => {
      count += item.quantity;
    });
    dispatch(countCartRedux(count));
  }, [dataAddToCart]);

  useEffect(() => {
    setVavExpanded(false);
  }, [clickContent]);

  const handleProfile = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    setVavExpanded(false);
    window.onscroll = function () {
      if (scrollPosition < 150) {
        sethState("down");
      }
      if (scrollPosition > 150) {
        sethState("up");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const handleSearchKeyWord = () => {
    setKeyWord("");
    if (keyWord) {
      navigate(`/search-product/${keyWord}`);
    } else {
      toast.warning("Vui lòng điền thông tin cần tìm!");
      // navigate(`/search-product`)
    }
  };

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key == 13) {
      handleSearchKeyWord();
    }
  };

  return (
    <div className="header-main">
      <div
        className={`header-scroll w-full text-lg font-semibold " + ${hState}`}
        hidden={scrollPosition < 100 ? true : false}
      >
        <Navbar
          className={"header-container"}
          bg="white"
          expand="lg"
          onToggle={() => setVavExpanded(!navExpanded)}
          expanded={navExpanded}
        >
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Nav.Link
              onClick={() => {
                window.scrollTo(0, 0);
                setVavExpanded(false);
              }}
            >
              <div onClick={() => navigate("/")} className="nav-logo-header">
                <div className="logo-header">
                  <img src={logoPetShop} className="logo" />
                  <img src={logoMini} className="logo mini" />
                </div>
              </div>
            </Nav.Link>

            <Navbar.Collapse
              id="navbarScroll"
              onClick={() => setVavExpanded(false)}
            >
              <Nav className="nav-router">
                <Nav.Link
                  className={`link-router`}
                  onClick={() => navigate("/")}
                >
                  TRANG CHỦ
                </Nav.Link>

                <Nav.Link
                  className={`link-router`}
                  onClick={() => navigate("/category")}
                >
                  GIỐNG MÈO CẢNH
                </Nav.Link>

                <Nav.Link
                  className={`link-router`}
                  onClick={() => navigate("/collections/all")}
                >
                  FOR CAT
                </Nav.Link>

                {/* <Nav.Link >
                                            <Link to="/blog" className={`link-router ${numberRouter == 1 && "router-selected"}`} >
                                                BLOG
                                            </Link>
                                        </Nav.Link> */}
                <Nav.Link
                  className={`link-router`}
                  onClick={() => navigate("/introduce")}
                >
                  GIỚI THIỆU
                </Nav.Link>

                <Nav.Link
                  className={`link-router`}
                  onClick={() => navigate("/search-order")}
                >
                  TÌM KIẾM ĐƠN HÀNG
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>

            <Nav.Link
              className="cart-header"
              onClick={() => setVavExpanded(false)}
            >
              <FiSearch
                className="icon-search-product"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/search-product");
                }}
              />
              <TiUser className="user-icon" onClick={handleProfile} />
              <div
                className="cart"
                onClick={() =>
                  dispatch({
                    type: SHOW_CART,
                    payload: true,
                  })
                }
              >
                <MdShoppingCart className="cart-icon" />
                <span className="cart-counter">{countCart || 0}</span>
              </div>
            </Nav.Link>
            <div className="shadow-cart"></div>
          </Container>
          <Cart show={showCartRedux} />
        </Navbar>
      </div>
      <div>
        <Navbar
          className={"header-container alway-top "}
          bg="white"
          expand="lg"
          onToggle={() => setVavExpanded(!navExpanded)}
          expanded={navExpanded}
        >
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Nav.Link
              onClick={() => {
                window.scrollTo(0, 0);
                setVavExpanded(false);
              }}
            >
              <div onClick={() => navigate("/")} className="nav-logo-header">
                <div className="logo-header">
                  <img src={logoPetShop} className="logo" />
                  <img src={logoMini} className="logo mini" />
                </div>
              </div>
            </Nav.Link>

            <div className="search-button">
              <div className="input-group search ">
                <input
                  type="text"
                  className="form-control input-search"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={keyWord}
                  onChange={(e) => setKeyWord(e.target.value)}
                  ref={refInput}
                  onKeyUp={(e) => handleKeyPress(e)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    handleSearchKeyWord();
                  }}
                >
                  <RiSearch2Line />
                </button>
              </div>
              <div className="header-router">
                <Navbar.Collapse
                  id="navbarScroll"
                  onClick={() => setVavExpanded(false)}
                >
                  <Nav className="nav-router">
                    <Nav.Link
                      className={`link-router`}
                      onClick={() => navigate("/")}
                    >
                      TRANG CHỦ
                    </Nav.Link>

                    <Nav.Link
                      className={`link-router`}
                      onClick={() => navigate("/category")}
                    >
                      GIỐNG MÈO CẢNH
                    </Nav.Link>

                    <Nav.Link
                      className={`link-router`}
                      onClick={() => navigate("/collections/all")}
                    >
                      FOR CAT
                    </Nav.Link>

                    {/* <Nav.Link >
                                            <Link to="/blog" className={`link-router ${numberRouter == 1 && "router-selected"}`} >
                                                BLOG
                                            </Link>
                                        </Nav.Link> */}
                    <Nav.Link
                      className={`link-router`}
                      onClick={() => navigate("/introduce")}
                    >
                      GIỚI THIỆU
                    </Nav.Link>

                    <Nav.Link
                      className={`link-router`}
                      onClick={() => navigate("/search-order")}
                    >
                      TÌM KIẾM ĐƠN HÀNG
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </div>

            <Nav.Link
              className="cart-header"
              onClick={() => setVavExpanded(false)}
            >
              {/* <FiSearch className='icon-search-product' /> */}
              <TiUser className="user-icon" onClick={handleProfile} />
              <div
                className="cart"
                onClick={() =>
                  dispatch({
                    type: SHOW_CART,
                    payload: true,
                  })
                }
              >
                <MdShoppingCart className="cart-icon" />
                <span className="cart-counter">{countCart || 0}</span>
              </div>
            </Nav.Link>
            <div className="shadow-cart"></div>
          </Container>
          <Cart show={showCartRedux} />
        </Navbar>
      </div>
      <div className="search-button-page col-md-6">
        <div className="input-group search-page ">
          <input
            type="text"
            className="form-control input-search"
            placeholder="Tìm kiếm sản phẩm..."
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
            ref={refInput}
            onKeyUp={(e) => handleKeyPress(e)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              if (keyWord) {
                handleSearchKeyWord();
              }
            }}
          >
            <RiSearch2Line />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
