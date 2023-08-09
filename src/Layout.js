import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Admin from "./components/Admin/Admin";
import Category from "./components/Category/Category";
import CategoryDetail from "./components/Category/CategoryDetail";
import Checkout from "./components/Checkout/Checkout";
import Collections from "./components/Collections/Collections";
import Home from "./components/Home/Home";
import Introduce from "./components/Introduce/Introduce";
import DetailProduct from "./components/Products/DetailProduct";
import Profile from "./components/Profile/Profile";
import SearchOrder from "./components/SearchOrder/SearchOrder";
import SearchProduct from "./components/SearchProduct/SearchProduct";

function Layout(props) {
  return (
    <>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search-order/:id" element={<SearchOrder />} />
          <Route path="/search-order/" element={<SearchOrder />} />
          <Route path="/search-product/:keyWord" element={<SearchProduct />} />
          <Route path="/search-product" element={<SearchProduct />} />
          <Route path="/search-product" element={<SearchProduct />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:keyWord" element={<CategoryDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:type" element={<Collections />} />
          <Route path="/introduce" element={<Introduce />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Layout;
