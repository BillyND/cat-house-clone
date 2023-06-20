import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiLogin } from "../components/services/apiServices";
import "./Auth.scss";
import { useDispatch } from "react-redux";
import { USER_LOGIN, USER_LOGOUT } from "../redux/actions/userActions";
import { BsEyeSlashFill, BsEye } from "react-icons/bs";
var bcrypt = require("bcryptjs-react");

function Login() {
  const refInput = useRef(null);
  const [dataAllUser, setDataAllUser] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const arrayHashPass = [];
  const arrayHashUsername = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  useEffect(() => {
    refInput.current.focus();
    dispatch({
      type: USER_LOGOUT,
    });
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePass = (pass) => {
    return pass.match(/^.{6,}$/);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const dataAllUser = await apiLogin();
    try {
      if (!validateEmail(username)) {
        toast.error("Email không đúng định dạng");
        setIsLoading(false);
        return;
      }

      if (!validatePass(password)) {
        toast.error("Mật khẩu tối thiểu 6 ký tự");
        setIsLoading(false);
        return;
      }
      let checkLogin = 0;
      dataAllUser.map((dataUser, index) => {
        //check hass password
        // const checkPass = bcrypt.compareSync(password, dataUser.password);
        // const checkUsername = bcrypt.compareSync(username, dataUser.username);

        if (password === dataUser.password && username === dataUser.username) {
          checkLogin = 1;
          setTimeout(() => {
            toast.success("Đăng nhập thành công!");

            navigate("/");
            setIsLoading(false);
            dispatch({
              type: USER_LOGIN,
              user: dataUser,
            });
          }, 300);
        }
      });
      if (checkLogin === 0) {
        toast.error("Tài khoản hoặc mật khẩu sai!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleLogin();
    }
  };

  const backToHome = () => {
    dispatch({
      type: USER_LOGOUT,
    });
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="header">
        <div className="header-content">
          <span>Chưa có tài khoản?</span>
          <button
            className="btnSignup"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Đăng ký
          </button>
        </div>
      </div>
      <div className="login-signup d-flex justify-content-center">
        <div className="login-table mt-5">
          <div className="title col-12 mx-auto">
            <h3>CatHouse</h3>
          </div>
          <div className="wellcome col-12 mx-auto">Xin chào, bạn là ai?</div>
          <div className="auth-content form-group col-10  mx-auto">
            <label>Email</label>
            <input
              type={"email"}
              className="form-control"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              ref={refInput}
              onKeyUp={(e) => handleKeyPress(e)}
              placeholder="Email..."
            />
            <label>Mật khẩu </label>
            <div className="password-input">
              <input
                type={showPass === false ? "password" : "text"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => handleKeyPress(e)}
                placeholder="Mật khẩu..."
              />
              {showPass === true ? (
                <BsEye
                  className="icon-eye hide"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <BsEyeSlashFill
                  className="icon-eye show"
                  onClick={() => setShowPass(!showPass)}
                />
              )}
            </div>
            <div className="forgotPass mt-2 text-center">
              <span>Quên mật khẩu?</span>
            </div>
            <button
              className="btn btn-dark col-12"
              onClick={() => handleLogin()}
              disabled={isLoading}
            >
              {isLoading && (
                <span
                  className="spinner-grow spinner-grow-sm"
                  style={{ color: "#ffffff00" }}
                  role="status"
                ></span>
              )}
              <span>Đăng nhập </span>
              {isLoading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></span>
              )}{" "}
            </button>
            <div className="goToHomePage">
              <span onClick={() => backToHome()}>
                {" "}
                &#60;&#60;&#60; Quay lại trang chủ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
