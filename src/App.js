import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { fetchAllProductsRedux } from "./redux/actions/productActions";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

function App() {
  const [hState, sethState] = useState("top");
  const userRedux = useSelector((state) => state.account.user);
  const [closeNav, setCloseNav] = useState(false);
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleClickContent = () => {
    setCloseNav(!closeNav);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.onscroll = function () {};
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className="App">
      {scrollPosition > 400 && (
        <div
          className="scroll-to-top "
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <BsFillArrowUpCircleFill className="to-top" />
        </div>
      )}
      <div className="banner-header">
        {/* <span>
          Miễn phí vận chuyển với đơn hàng trên <b>500k</b>
        </span> */}
      </div>
      <div className={"header"}>
        <Header clickContent={closeNav} />
      </div>

      <div className="content  container" onClick={handleClickContent}>
        <Outlet />
      </div>
      <div className="footer ">
        <Footer className="footer-component" />
      </div>
    </div>
  );
}

export default App;
