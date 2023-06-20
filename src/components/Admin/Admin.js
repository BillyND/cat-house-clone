import "./Admin.scss";
import { useEffect, useRef, useState } from "react";
import {
  getAllProducts,
  getUserLimit,
  getApiSearch,
} from "../services/apiServices";
import AddNewProduct from "./Modal/AddNewProduct";
import UpdateProduct from "./Modal/UpdateProduct";
import DeleteProduct from "./Modal/DeleteProduct";
import ViewProduct from "./Modal/ViewProduct";
import { FaEye } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { TbSearch } from "react-icons/tb";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import ReactPaginate from "react-paginate";
import catGuest from "../../assets/catGuest.jpg";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { changeRouteRedux } from "../../redux/actions/routerActions";
import { v4 as uuidv4 } from "uuid";

function Admin(props) {
  const refInput = useRef(null);
  const inforUser = useSelector((state) => state.account.user);
  const [listProducts, setListProducts] = useState([]);
  const [listAllUsers, setListAllUsers] = useState([]);
  const [showAddNew, setShowAddNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [inforUpdate, setInforUpdate] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [inforDelete, setinforDelete] = useState({});
  const [showView, setShowView] = useState(false);
  const [inforView, setInforView] = useState({});
  const [limitUser, setLimitUser] = useState(4);
  const [page, setPage] = useState(1);
  const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    fetchAllUsers();
    dispatch(changeRouteRedux(1));
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    if (!keySearch) {
      setIsSearch(false);
      fetchAllUsers();
    }
  }, [keySearch]);

  const fetchAllUsers = async () => {
    const resLimitUser = await getUserLimit(limitUser, page);
    setListProducts(resLimitUser);
    if (!resLimitUser.length > 0) {
      setPage(page - 1);
    }
    const resAllUsers = await getAllProducts();

    setListAllUsers(resAllUsers);
  };

  const handleShowAddNew = () => {
    setShowAddNew(true);
  };

  const handleShowUpdate = (product) => {
    setInforUpdate(product);
    setShowUpdate(true);
  };

  const handleShowDelete = (product) => {
    setinforDelete(product);
    setShowDelete(true);
  };

  const handleShowView = (product) => {
    setInforView(product);
    setShowView(true);
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleSearchManage = async () => {
    setIsSearch(true);
    if (keySearch) {
      const resSearch = await getApiSearch(keySearch);
      setListProducts(resSearch);
    } else {
      setIsSearch(false);
    }
  };

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleSearchManage();
    }
  };

  return (
    <div className="adminPage container">
      <h5 className="mt-4">QUẢN LÝ SẢN PHẨM</h5>
      <div className="admin-header d-flex justify-content-between">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm..."
              ref={refInput}
              onKeyUpCapture={(e) => handleKeyPress(e)}
              value={keySearch}
              onChange={(e) => setKeySearch(e.target.value)}
            />
            <div
              className="input-group-prepend"
              onClick={() => handleSearchManage()}
            >
              <span className="btn btn-primary" id="basic-addon1">
                <TbSearch />
              </span>
            </div>
          </div>
        </div>

        <div className="button-header mb-3">
          <button
            className="btn btn-success ms-3"
            onClick={() => handleShowAddNew()}
            disabled={inforUser.role !== "admin"}
          >
            Thêm
          </button>
        </div>
      </div>

      <PerfectScrollbar>
        <div className="admin-table ">
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Ảnh mô tả</th>
                  <th scope="col">Thông tin</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {listProducts.map((product, index) => (
                  <tr key={uuidv4()} className="align-middle">
                    {/* <th scope="row">{product.id}</th> */}
                    <td>
                      {product.image1 ? (
                        <img
                          src={product.image1}
                          style={{ height: "50px", borderRadius: "10px" }}
                        />
                      ) : (
                        <>
                          {product.image2 ? (
                            <img
                              src={product.image2}
                              style={{ height: "50px", borderRadius: "10px" }}
                            />
                          ) : (
                            <>
                              {product.image3 ? (
                                <img
                                  src={product.image3}
                                  style={{
                                    height: "50px",
                                    borderRadius: "10px",
                                  }}
                                />
                              ) : (
                                <>
                                  <img
                                    src={catGuest}
                                    style={{
                                      height: "50px",
                                      borderRadius: "10px",
                                    }}
                                  />
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </td>
                    <td style={{ fontWeight: "500" }}>
                      {product.description ? (
                        <>{product.description} - </>
                      ) : (
                        <></>
                      )}

                      <span style={{ color: "red" }}>{product.price}đ</span>
                    </td>
                    <td className="button-control d-flex ">
                      <div>
                        <FaEye
                          className="button view mx-1"
                          onClick={() => handleShowView(product)}
                        />
                      </div>
                      <div hidden={inforUser.role !== "admin" ? true : false}>
                        <BsPencilFill
                          className="button update mx-1"
                          onClick={() => handleShowUpdate(product)}
                        />
                      </div>

                      <div hidden={inforUser.role !== "admin" ? true : false}>
                        <RiDeleteBinFill
                          className="button delete mx-1"
                          onClick={() => handleShowDelete(product)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {listProducts.length === 0 && (
            <div style={{ fontWeight: "500" }} className="text-center mx-auto">
              Không tìm thấy thú cưng theo yêu cầu
            </div>
          )}
          <div className="paginate-user">
            {!isSearch && (
              <ReactPaginate
                previousLabel={<TbPlayerTrackPrevFilled />}
                nextLabel={<TbPlayerTrackNextFilled />}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={listAllUsers.length / limitUser}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={0}
              />
            )}
          </div>
        </div>
      </PerfectScrollbar>

      <AddNewProduct
        show={showAddNew}
        setShow={setShowAddNew}
        fetchAllUsers={fetchAllUsers}
      />

      <UpdateProduct
        show={showUpdate}
        setShow={setShowUpdate}
        fetchAllUsers={fetchAllUsers}
        inforUpdate={inforUpdate}
        setInforUpdate={setInforUpdate}
      />

      <DeleteProduct
        show={showDelete}
        setShow={setShowDelete}
        fetchAllUsers={fetchAllUsers}
        inforDelete={inforDelete}
      />

      <ViewProduct
        show={showView}
        setShow={setShowView}
        fetchAllUsers={fetchAllUsers}
        inforView={inforView}
        setInforView={setInforView}
      />
    </div>
  );
}

export default Admin;
