import axios from "../../utils/customAxios";

const getAllProducts = () => {
  return axios.get("/products");
};

const getUserLimit = (limit, page) => {
  return axios.get(`/products?_limit=${limit}&_page=${page}`);
};

const postCreateProduct = (
  description,
  collection,
  category,
  price,
  image1,
  image2,
  image3
) => {
  return axios.post("/products", {
    description,
    collection,
    category,
    price,
    image1,
    image2,
    image3,
  });
};

const putUpdateProduct = (
  id,
  description,
  collection,
  category,
  price,
  image1,
  image2,
  image3
) => {
  return axios.patch(`/products/${id}`, {
    description,
    collection,
    category,
    price,
    image1,
    image2,
    image3,
  });
};

const deleteUser = (id) => {
  return axios.delete(`/products/${id}`);
};

const apiLogin = () => {
  return axios.get(`/users`);
};

const getOneUser = (id) => {
  return axios.get(`/users/?id=${id}`);
};

const apiSignup = (username, password) => {
  return axios.post(`/users`, { username, password });
};

const getProductById = (id) => {
  return axios.get(`/products/${id}`);
};

const postCartOrder = (data) => {
  return axios.post(`/list-cart`, data);
};

const putCartOrder = (id, data) => {
  return axios.patch(`/list-cart/${id}`, data);
};

const getProvince = () => {
  return axios.get(`https://provinces.open-api.vn/api/?depth=1`);
};
const getDistrict = (code) => {
  return axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
};
const getWard = (code) => {
  return axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
};

const getSearchOrder = (id) => {
  return axios.get(`/list-cart/?id=${id}`);
};

const putUpdateInfoUser = (
  id,
  username,
  role,
  password,
  name,
  phone,
  birthday,
  address,
  province,
  district,
  ward,
  listOrder
) => {
  return axios.patch(`/users/${id}`, {
    username,
    role,
    password,
    name,
    phone,
    birthday,
    address,
    province,
    district,
    ward,
    listOrder,
  });
};

const getApiSearch = (keyWord) => {
  return axios.get(`/products/?q=${keyWord}`);
};

const getAllCategory = (keyWrd) => {
  return axios.get(`/category`);
};

export {
  getAllProducts,
  postCreateProduct,
  putUpdateProduct,
  deleteUser,
  getUserLimit,
  apiLogin,
  apiSignup,
  getProductById,
  postCartOrder,
  getProvince,
  getDistrict,
  getWard,
  getSearchOrder,
  putUpdateInfoUser,
  getOneUser,
  getApiSearch,
  getAllCategory,
  putCartOrder,
};
