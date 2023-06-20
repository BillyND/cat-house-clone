import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  getDistrict,
  getProvince,
  getWard,
  putUpdateInfoUser,
} from "../services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  putInfoUserAction,
  putUpdateInfoUserRedux,
} from "../../redux/actions/userActions";

const noneOptions = [];

function UserProfile(props) {
  const inforUser = useSelector((state) => state.account.user);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [ward, setWArd] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [optionsWard, setOptionsWArd] = useState("");
  const [optionsDistrict, setOptionsDistrict] = useState("");
  const [optionsProvince, setOptionsProvince] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();
  const phoneRef = useRef();
  const provinceRef = useRef();
  const districtRef = useRef();
  const wardRef = useRef();

  useEffect(() => {
    fetchProvince();
    setDefaultInfo();
    window.scrollTo(0, 0);
  }, []);

  const setDefaultInfo = () => {
    setName(inforUser.name);
    setUsername(inforUser.username);
    setPhone(inforUser.phone);
    setBirthday(inforUser.birthday);
    setAddress(inforUser.address);
    setWArd(inforUser.ward);
    setDistrict(inforUser.district);
    setProvince(inforUser.province);
  };

  const dispatch = useDispatch();

  const fetchProvince = async () => {
    let options = [];
    try {
      const resProvince = await getProvince();
      resProvince.map((item) => {
        options.push({
          value: item.name,
          label: item.name,
          code: item.code,
          codename: item.codename,
          district: item.district,
          division_type: item.division_type,
          name: item.name,
          phone_code: item.phone_code,
        });
      });
      setOptionsProvince(options);
    } catch (error) {
      toast.error("Máy chủ lỗi!");
    }
  };

  const handleChooseProvince = async (type, value) => {
    let options = [];

    switch (type) {
      case "PROVINCE":
        setProvince(value.value);
        setDistrict("");
        setWArd("");
        try {
          const resDistrict = await getDistrict(value.code);
          resDistrict.districts.map((item) => {
            options.push({
              value: item.name,
              label: item.name,
              code: item.code,
              codename: item.codename,
              district: item.district,
              division_type: item.division_type,
              name: item.name,
              phone_code: item.phone_code,
            });
          });
          setOptionsDistrict(options);
        } catch (error) {
          toast.error("Máy chủ lỗi!");
        }
        break;
      case "DISTRICT":
        setDistrict(value.value);
        setWArd("");
        try {
          const resWard = await getWard(value.code);
          resWard.wards.map((item) => {
            options.push({
              value: item.name,
              label: item.name,
              code: item.code,
              codename: item.codename,
              ward: item.ward,
              division_type: item.division_type,
              name: item.name,
              phone_code: item.phone_code,
            });
          });
          setOptionsWArd(options);
        } catch (error) {
          toast.error("Máy chủ lỗi!");
        }
        break;
      case "WARD":
        setWArd(value.value);
        break;

      default:
        toast.error("Máy chủ lỗi!");
    }
  };

  const regexPhoneNumber = (phone) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

    return phone.match(regexPhoneNumber) ? true : false;
  };

  const regexName = (name) => {
    const regexNameMAtch = /[a-zA-Z]+(?: [a-zA-Z]+)+/gm;
    return name.match(regexNameMAtch) ? true : false;
  };

  const handleUpdateInfoUser = async () => {
    setIsLoading(true);
    if (
      !name ||
      !phone ||
      !province ||
      !district ||
      !ward ||
      !regexPhoneNumber(phone) ||
      !regexName(name)
    ) {
      if (!name) {
        setIsLoading(false);
        toast.error("Tên không được để trống!");
        nameRef.current.focus();

        return;
      }
      if (!regexName(name)) {
        setIsLoading(false);
        toast.error("Tên phải ít nhất hai từ!");
        nameRef.current.focus();

        return;
      }
      if (!phone) {
        setIsLoading(false);
        toast.error("SĐT không được để trống!");
        phoneRef.current.focus();

        return;
      }
      if (!regexPhoneNumber(phone)) {
        setIsLoading(false);
        toast.error("SĐT không đúng định dạng!");
        phoneRef.current.focus();

        return;
      }

      if (!province) {
        setIsLoading(false);
        toast.error("Tỉnh không được để trống!");
        provinceRef.current.focus();

        return;
      }
      if (!district) {
        setIsLoading(false);
        toast.error("Huyện không được để trống!");
        districtRef.current.focus();

        return;
      }
      if (!ward) {
        setIsLoading(false);
        toast.error("Xã không được để trống!");
        wardRef.current.focus();

        return;
      }

      setIsLoading(false);
      return;
    }
    try {
      const resUpdate = await putUpdateInfoUser(
        inforUser.id,
        inforUser.username,
        inforUser.role,
        inforUser.password,
        name,
        phone,
        birthday,
        address,
        province,
        district,
        ward,
        inforUser.listOrder
      );
      // dispatch(putInfoUserAction(inforUser.id, inforUser.username, inforUser.role, inforUser.password, name, phone, birthday, address, province, district, ward, inforUser.listCart))
      dispatch(putUpdateInfoUserRedux(resUpdate));
      toast.success("Cập nhật thông tin thành công!");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="user-profile">
      <h2>Thông tin cá nhân</h2>
      <form>
        <div className="form-group pb-3">
          <label htmlFor="exampleInputEmail1">Tài khoản</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            disabled
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group  pb-3">
          <label htmlFor="exampleInputname">Họ và tên</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputname"
            placeholder="Họ và tên"
            value={name}
            ref={nameRef}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group  pb-3">
          <label htmlFor="exampleInputPhone">Số điện thoại</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPhone"
            placeholder="Số điện thoại"
            value={phone}
            ref={phoneRef}
            onChange={(e) => setPhone(e.target.value)}
            onWheel={(event) => event.currentTarget.blur()}
          />
        </div>
        <div className="form-group  pb-3">
          <label htmlFor="exampleInputBirthday">Ngày sinh</label>
          <input
            type="date"
            className="form-control"
            id="exampleInputBirthday"
            placeholder="Ngày sinh"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>

        <div className="row pb-3">
          <div className="col-md-4 mb-3">
            <label htmlFor="inputState">Thành phố/Tỉnh</label>
            <Select
              ref={provinceRef}
              placeholder={<div>TP/Tỉnh</div>}
              onChange={(e) => handleChooseProvince("PROVINCE", e)}
              options={optionsProvince || noneOptions}
              value={{ label: province }}
            />
          </div>
          <div className=" col-md-4 mb-3">
            <label htmlFor="inputState">Quận/Huyện</label>
            <Select
              ref={districtRef}
              placeholder={<div>Quận/Huyện</div>}
              onChange={(e) => handleChooseProvince("DISTRICT", e)}
              options={optionsDistrict || noneOptions}
              value={{ label: district }}
            />
          </div>
          <div className=" col-md-4 mb-3" disabled>
            <label htmlFor="inputState">Phường/xã</label>
            <Select
              ref={wardRef}
              placeholder={<div>Phường/xã</div>}
              onChange={(e) => handleChooseProvince("WARD", e)}
              options={optionsWard || noneOptions}
              value={{ label: ward }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="inputAddress">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          className="btn btn-success me-2 mb-2 "
          style={{ width: "140px" }}
          onClick={handleUpdateInfoUser}
          disabled={isLoading}
        >
          {isLoading && (
            <span
              className="spinner-grow spinner-grow-sm ms-1"
              style={{ color: "#ffffff00" }}
              role="status"
            ></span>
          )}
          Cập nhật
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm ms-1"
              role="status"
            ></span>
          )}
        </button>
        <button
          type="button"
          className="btn btn-secondary mb-2"
          onClick={setDefaultInfo}
        >
          Huỷ thay đổi
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
