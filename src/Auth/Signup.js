import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiLogin, apiSignup } from "../components/services/apiServices";
import "./Auth.scss";
import { BsEyeSlashFill, BsEye } from "react-icons/bs";

var bcrypt = require("bcryptjs-react");

function Signup() {
  const refInput = useRef(null);
  const [dataAllUser, setDataAllUser] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [checkSignup, setCheckSignup] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    refInput.current.focus();
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    const resAllUser = await apiLogin();
    setDataAllUser(resAllUser);
  };

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

  const handleSignup = async () => {
    setIsloading(true);
    let checkUsername = 0;
    let checkPassword = 0;

    if (!validateEmail(username)) {
      toast.error("Email không đúng định dạng");
      setIsloading(false);
      return;
    }

    if (!validatePass(password) && checkUsername === 0) {
      toast.error("Mật khẩu tối thiểu 6 ký tự");
      setIsloading(false);
      return;
    }

    if (password !== rePassword) {
      toast.error("Mật khẩu nhập lại chưa đúng!");
      checkPassword = 1;
      setIsloading(false);
      return;
    }

    //make hash password
    // let saltPass = bcrypt.genSaltSync(10);
    // let hashPassword = bcrypt.hashSync(password, saltPass);

    // //make hash username
    // let saltUsername = bcrypt.genSaltSync(10);
    // let hashUsername = bcrypt.hashSync(username, saltUsername);

    //check userName

    dataAllUser.map((dataUser) => {
      // const checkHashUsername = bcrypt.compareSync(username, dataUser.username);
      if (username === dataUser.username) {
        toast.error("Tài khoản đã tồn tại");
        checkUsername = 1;
        setIsloading(false);
      }
    });

    if (checkUsername === 0 && checkPassword === 0) {
      const resSignup = await apiSignup(username, password);
      if (resSignup) {
        setTimeout(async () => {
          navigate("/login");
          toast.success("Đăng ký tài khoản thành công!");

          setPassword("");
          setUserName("");
          setIsloading(false);
          navigate("/login");
        }, 300);
      }
    }

    setCheckSignup(!checkSignup);
  };

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleSignup();
    }
  };

  return (
    <div className="login-page">
      <div className="header">
        <div className="header-content">
          <span>Có tài khoản rồi?</span>
          <button
            className="btnSignup"
            onClick={() => {
              navigate("/login");
            }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
      <div className="login-signup d-flex justify-content-center">
        <div className="login-table mt-5">
          <div className="title col-12 mx-auto">
            <h3>CatHouse</h3>
          </div>
          <div className="wellcome col-12 mx-auto">
            Đăng ký và tìm thú cưng cho bạn!
          </div>
          <div className="auth-content form-group col-10  mx-auto">
            <label>Email </label>
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
            <label>Nhập lại mật khẩu </label>
            <input
              type={showPass === false ? "password" : "text"}
              className="form-control"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              onKeyUp={(e) => handleKeyPress(e)}
              placeholder="Nhập lại mật khẩu..."
            />
            <button
              className="btn btn-dark col-12"
              onClick={() => handleSignup()}
              disabled={isLoading}
            >
              {isLoading && (
                <span
                  className="spinner-grow spinner-grow-sm"
                  style={{ color: "#ffffff00" }}
                  role="status"
                ></span>
              )}
              <span>Đăng ký </span>
              {isLoading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></span>
              )}
            </button>
            <div className="goToHomePage">
              <span
                onClick={() => {
                  navigate("/");
                }}
              >
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

export default Signup;
