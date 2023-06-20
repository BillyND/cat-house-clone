import App from "./App";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import { ToastContainer, toast } from "react-toastify";
import Login from "./Auth/Login";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./Auth/Signup";
import PrivateRoutes from "./routes/PrivateRoutes";
import DetailProduct from "./components/Products/DetailProduct";
import Checkout from "./components/Checkout/Checkout";
import Profile from "./components/Profile/Profile";
import SearchOrder from "./components/SearchOrder/SearchOrder";
import SearchProduct from "./components/SearchProduct/SearchProduct";
import Category from "./components/Category/Category";
import CategoryDetail from "./components/Category/CategoryDetail";
import Collections from "./components/Collections/Collections";
import Blog from "./components/Blog/Blog";
import Introduce from "./components/Introduce/Introduce";

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
          <Route path="/blog" element={<Blog />} />
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
