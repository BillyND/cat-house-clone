import { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

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
      <div
        className={`scroll-to-top ${scrollPosition > 400 ? "show" : "hidden"}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <BsFillArrowUpCircleFill className="to-top" />
      </div>

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
