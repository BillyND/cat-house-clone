import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeRouteRedux } from "../../redux/actions/routerActions";
import { USER_LOGIN, USER_LOGOUT } from "../../redux/actions/userActions";
import { getOneUser } from "../services/apiServices";
import "./Profile.scss";
import UserListOrder from "./UserListOrder";
import UserProfile from "./UserProfile";

function Profile(props) {
  const isAuthenticated = useSelector((state) => state.account.user.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(1);
  const infoUser = useSelector((state) => state.account.user);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      dispatch({
        type: USER_LOGOUT,
      });
      navigate("/login");
    } else {
      fetchOneUser();
    }
  }, [selected]);

  const fetchOneUser = async () => {
    const resOneUser = await getOneUser(infoUser.id);

    dispatch({
      type: USER_LOGIN,
      user: resOneUser[0],
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch({
        type: USER_LOGOUT,
      });
      navigate("/login");
    } else {
    }
    fetchOneUser();
    window.scrollTo(0, 0);
  }, []);

  const handleLogOut = () => {
    try {
      setIsLoading(true);
      dispatch({
        type: USER_LOGOUT,
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profile-page p-4  pt-5">
      <div className="colum-info">
        {infoUser.name && <h2>{infoUser.name}</h2>}
        <button
          className={`btn btn-white text-left ${selected == 1 ? "active" : ""}`}
          onClick={handleClick(1)}
        >
          Thông tin cá nhân
        </button>
        <button
          className={`btn btn-white text-left ${selected == 2 ? "active" : ""}`}
          onClick={handleClick(2)}
        >
          Danh sách đơn hàng
        </button>
        {/* <button className={`btn btn-white text-left ${selected == 3 ? "active" : ""}`} onClick={handleClick(3)}>Đánh giá</button>
                <button className={`btn btn-white text-left ${selected == 4 ? "active" : ""}`} onClick={handleClick(4)}>Ví voucher</button> */}
        <button
          disabled={isLoading}
          className="btn btn-white text-left"
          onClick={() => handleLogOut()}
        >
          Thoát
          <div
            className="spinner-border spinner-border-sm mx-2"
            role="status"
            hidden={!isLoading}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </button>
      </div>
      <div className="colum-detail">
        {selected === 1 ? <UserProfile /> : <></>}
        {selected === 2 ? <UserListOrder /> : <></>}
      </div>
    </div>
  );
}

export default Profile;
